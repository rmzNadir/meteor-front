const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#C598D8', //'#00C2B2',
              '@layout-body-background': '#131313',
              '@body-background': '#131313',
              '@border-radius-base': '0.25rem',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
