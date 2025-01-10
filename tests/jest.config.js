module.exports = {
    testEnvironment: 'node',
    globalSetup: './completeDBSetup.js',
    // globalTeardown: './tearDownDatabase.js',
    setupFilesAfterEnv: ['./jest.setup.js'],
};
  