#!/usr/bin/env node
/**
 * Non-interactive latest bump + markdown report of majors / breaking-range upgrades.
 * Run from a package root. Writes bump-report.md and bump-report.json.
 */
import {execFileSync, execSync} from 'node:child_process';
import {appendFileSync, readFileSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

const cwd = process.cwd();
const pkgPath = join(cwd, 'package.json');
const inActions = Boolean(process.env.GITHUB_ACTIONS);

function readPkg() {
  return JSON.parse(readFileSync(pkgPath, 'utf8'));
}

function depMap(pkg) {
  return {
    ...(pkg.dependencies ?? {}),
    ...(pkg.devDependencies ?? {}),
    ...(pkg.optionalDependencies ?? {}),
  };
}

function parseVer(raw) {
  const match = String(raw).match(/(\d+)\.(\d+)\.(\d+)/);
  if (!match) return null;
  return {major: Number(match[1]), minor: Number(match[2]), patch: Number(match[3]), text: `${match[1]}.${match[2]}.${match[3]}`};
}

function cmp(a, b) {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  return a.patch - b.patch;
}

function inRange(version, from, to) {
  return cmp(version, from) > 0 && cmp(version, to) <= 0;
}

/** 0.x minor bumps are treated as breaking, same as a major. */
function bumpKind(from, to) {
  if (!from || !to) return 'unknown';
  if (from.major !== to.major) return 'major';
  if (from.major === 0 && from.minor !== to.minor) return 'major';
  if (from.minor !== to.minor) return 'minor';
  if (from.patch !== to.patch) return 'patch';
  return 'none';
}

function sh(cmd, opts = {}) {
  return execSync(cmd, {cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...opts});
}

function shOk(cmd) {
  try {
    return sh(cmd).trim();
  } catch {
    return '';
  }
}

function npmView(name, field) {
  try {
    return execFileSync('npm', ['view', name, field, '--json'], {cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']}).trim();
  } catch {
    return '';
  }
}

function githubRepo(raw) {
  if (!raw) return null;
  let value = raw;
  try {
    const parsed = JSON.parse(raw);
    value = parsed?.url ?? parsed ?? raw;
  } catch {
    // already a string
  }
  const text = String(value).replace(/^git\+/, '').replace(/^git:\/\//, 'https://').replace(/\.git$/, '');
  const match = text.match(/github\.com[/:]([^/]+)\/([^/#\s]+)/i);
  if (!match) return null;
  return {owner: match[1], repo: match[2].replace(/\.git$/, '')};
}

function versionFromTag(tag, pkgName) {
  const scoped = pkgName.split('/').pop();
  const patterns = [
    new RegExp(`${scoped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[@/]v?(\\d+\\.\\d+\\.\\d+)`, 'i'),
    /v?(\d+\.\d+\.\d+)/,
  ];
  for (const pattern of patterns) {
    const match = String(tag).match(pattern);
    if (match) return parseVer(match[1]);
  }
  return null;
}

function releaseNotes(pkgName, from, to) {
  const repo = githubRepo(npmView(pkgName, 'repository'));
  const homepage = shOk(`npm view ${JSON.stringify(pkgName)} homepage`);
  const npmUrl = `https://www.npmjs.com/package/${pkgName}`;
  const links = [`npm: ${npmUrl}`];
  if (homepage && homepage !== npmUrl) links.push(`home: ${homepage}`);
  if (!repo) return {links, notes: []};

  links.push(`compare: https://github.com/${repo.owner}/${repo.repo}/compare/v${from.text}...v${to.text}`);
  links.push(`releases: https://github.com/${repo.owner}/${repo.repo}/releases`);

  let releases = [];
  try {
    const json = execFileSync('gh', ['api', `repos/${repo.owner}/${repo.repo}/releases?per_page=40`], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    releases = JSON.parse(json);
    if (!Array.isArray(releases)) releases = [];
  } catch {
    releases = [];
  }

  const notes = [];
  for (const release of releases) {
    const version = versionFromTag(release.tag_name ?? release.name ?? '', pkgName);
    if (!version || !inRange(version, from, to)) continue;
    const body = String(release.body ?? '')
      .split('\n')
      .slice(0, 40)
      .join('\n')
      .trim();
    notes.push({tag: release.tag_name, name: release.name ?? release.tag_name, body});
  }
  return {links, notes};
}

function formatSection(title, rows) {
  if (rows.length === 0) return '';
  const lines = [`## ${title}`, ''];
  for (const row of rows) lines.push(`- \`${row.name}\` ${row.from} → ${row.to}`);
  lines.push('');
  return lines.join('\n');
}

const beforePkg = readPkg();
const before = depMap(beforePkg);
const beforePnpm = beforePkg.packageManager ?? '';

sh('corepack use pnpm@latest');
sh('pnpm update --latest');

const afterPkg = readPkg();
const after = depMap(afterPkg);
const afterPnpm = afterPkg.packageManager ?? '';

const names = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const changes = {major: [], minor: [], patch: [], unknown: []};

for (const name of names) {
  if (before[name] === after[name]) continue;
  const from = parseVer(before[name] ?? '');
  const to = parseVer(after[name] ?? '');
  const kind = bumpKind(from, to);
  const row = {name, from: before[name] ?? '(added)', to: after[name] ?? '(removed)', fromVer: from, toVer: to};
  (changes[kind] ?? changes.unknown).push(row);
}

const leftover = shOk('pnpm outdated');
const pnpmChanged = beforePnpm !== afterPnpm;
const hasChanges =
  pnpmChanged ||
  changes.major.length + changes.minor.length + changes.patch.length + changes.unknown.length > 0;
const hasMajors = changes.major.length > 0;
const packageName = afterPkg.name ?? 'package';

const report = [];
report.push(`# Bump report — ${packageName}`);
report.push('');
if (!hasChanges) {
  report.push('No dependency updates.');
  report.push('');
} else {
  if (pnpmChanged) {
    report.push(`pnpm ${beforePnpm.split('+')[0] || beforePnpm || '(none)'} → ${afterPnpm.split('+')[0] || afterPnpm}`);
    report.push('');
  }
  report.push(formatSection('Majors / breaking-range', changes.major).trimEnd());
  for (const row of changes.major) {
    if (!row.fromVer || !row.toVer) continue;
    const {links, notes} = releaseNotes(row.name, row.fromVer, row.toVer);
    report.push('');
    report.push(`### \`${row.name}\` ${row.from} → ${row.to}`);
    report.push('');
    for (const link of links) report.push(`- ${link}`);
    if (notes.length === 0) {
      report.push('- No GitHub releases found in this range. Read the compare URL and npm page.');
    } else {
      for (const note of notes) {
        report.push('');
        report.push(`#### ${note.name}`);
        report.push('');
        report.push(note.body || '_No release body._');
      }
    }
    report.push('');
  }
  report.push(formatSection('Minors', changes.minor).trimEnd());
  report.push(formatSection('Patches', changes.patch).trimEnd());
  report.push(formatSection('Unparsed', changes.unknown).trimEnd());
}

if (leftover) {
  report.push('## Still outdated');
  report.push('');
  report.push('```');
  report.push(leftover);
  report.push('```');
  report.push('');
}

const markdown = report.filter((line, i, arr) => !(line === '' && arr[i - 1] === '')).join('\n').trim() + '\n';
const summary = {
  name: packageName,
  hasChanges,
  hasMajors,
  majors: changes.major.map((row) => `${row.name} ${row.from} → ${row.to}`),
  minors: changes.minor.map((row) => `${row.name} ${row.from} → ${row.to}`),
  patches: changes.patch.map((row) => `${row.name} ${row.from} → ${row.to}`),
};

writeFileSync(join(cwd, 'bump-report.md'), markdown);
writeFileSync(join(cwd, 'bump-report.json'), `${JSON.stringify(summary, null, 2)}\n`);
writeFileSync(join(tmpdir(), `bump-report-${packageName.replace(/[^a-z0-9-]+/gi, '_')}.md`), markdown);

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(
    process.env.GITHUB_OUTPUT,
    `has_changes=${hasChanges}\nhas_majors=${hasMajors}\npackage_name=${packageName}\n`,
  );
}

process.stdout.write(markdown);
process.exit(inActions || !hasMajors ? 0 : 2);
