const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    lessOptions: {
      modifyVars: {
        '@primary-color': '#C598D8', //'#00C2B2',
        '@layout-body-background': '#131313',
        '@body-background': '#131313',
        '@border-radius-base': '0.25rem',
      },
      javascriptEnabled: true,
    },
  })
);
