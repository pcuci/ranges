module.exports = function (wallaby) {
  return {
    target: "es6",
    files: [
      'src/**/*.js'
    ],
    tests: [
      'test/**/*spec.js'
    ],
    testFramework: 'ava',
    env: { type: 'node' }
  }
}