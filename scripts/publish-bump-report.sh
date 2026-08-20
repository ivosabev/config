#!/usr/bin/env bash
set -euo pipefail

# Upload bump-report.md to S3 and email it via SES (eu-central-1).
# Expects bump-report.md + bump-report.json in cwd. Optional validate.log.

REGION="${AWS_REGION:-eu-central-1}"
BUCKET="${BUMP_REPORT_BUCKET:-ufleet-devops}"
FROM="${BUMP_REPORT_FROM:-Package bumps <no-reply@ufleet.io>}"
TO="${BUMP_REPORT_TO:-ivolution@gmail.com}"

if [[ ! -f bump-report.md || ! -f bump-report.json ]]; then
  echo "bump-report.md and bump-report.json are required" >&2
  exit 1
fi

PKG="$(python3 -c 'import json; print(json.load(open("bump-report.json"))["name"])')"
HAS_MAJORS="$(python3 -c 'import json; print("true" if json.load(open("bump-report.json"))["hasMajors"] else "false")')"
DATE="$(date -u +%Y-%m-%d)"
SAFE_PKG="${PKG#@}"
KEY="package-bumps/${SAFE_PKG}/${DATE}-${GITHUB_RUN_ID:-local}.md"

if [[ -f validate.log ]]; then
  {
    echo
    echo '## Validate'
    echo
    echo '```'
    cat validate.log
    echo '```'
  } >> bump-report.md
fi

aws s3 cp bump-report.md "s3://${BUCKET}/${KEY}" --region "$REGION" --content-type text/markdown
PRESIGN="$(aws s3 presign "s3://${BUCKET}/${KEY}" --expires-in 604800 --region "$REGION")"

SUBJECT="Bump report: ${PKG} (${DATE})"
if [[ "$HAS_MAJORS" == "true" ]]; then
  SUBJECT="[majors] ${SUBJECT}"
fi

export SUBJECT PRESIGN FROM TO REGION
python3 <<'PY'
import json, os, pathlib, subprocess

body = pathlib.Path("bump-report.md").read_text()
text = f"S3 (7-day link): {os.environ['PRESIGN']}\n\n{body}"
payload = {
    "FromEmailAddress": os.environ["FROM"],
    "Destination": {"ToAddresses": [os.environ["TO"]]},
    "Content": {
        "Simple": {
            "Subject": {"Data": os.environ["SUBJECT"], "Charset": "UTF-8"},
            "Body": {"Text": {"Data": text, "Charset": "UTF-8"}},
        }
    },
}
path = pathlib.Path("/tmp/ses-bump-email.json")
path.write_text(json.dumps(payload))
subprocess.check_call(
    ["aws", "sesv2", "send-email", "--cli-input-json", f"file://{path}", "--region", os.environ["REGION"]]
)
print(f"Uploaded s3://{os.environ.get('BUMP_REPORT_BUCKET', 'ufleet-devops')} and emailed {os.environ['TO']}")
PY
