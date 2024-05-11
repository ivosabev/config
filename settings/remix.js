module.exports = {
  'import/resolver': {
    typescript: {},
  },
  react: {
    formComponents: ['Form'],
    linkComponents: [
      {
        linkAttribute: 'to',
        name: 'Link',
      },
      {
        linkAttribute: 'to',
        name: 'NavLink',
      },
    ],
    version: 'detect',
  },
};
