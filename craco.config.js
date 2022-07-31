module.exports = {
  jest: {
    configure: {
      setupFilesAfterEnv: ['./jest.setup.js'],
      globals: {
        CONFIG: true
      }
    }
  },
  jsconfig: {}
};
