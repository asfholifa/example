const CracoAlias = require("craco-alias");

module.exports = {
  babel: {
    plugins: ['@babel/plugin-syntax-jsx'],
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        baseUrl: "./",
        source: "tsconfig",
        tsConfigPath: "./alias.json",
      },
    },
  ],
};
