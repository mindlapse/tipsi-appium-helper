import playground from './playground'
import runTapeTests from './tape'

export default function runTests(options) {
  if (options.runner === 'playground') {
    return playground({
      timeout: options.playgroundTimeout,
    })
  }
  if (options.runner === 'tape') {
    console.log("Runner is tape")
    if (options.tapeInit) {
      console.log("Initializing")
      const tapeInit = require(options.tapeInit).default
      return tapeInit({
        paths: [options.testsGlob],
        platform: options.platformName,
      })
    }
    console.log("About to call tape tests")
    return runTapeTests({
      paths: [options.testsGlob],
      platform: options.platformName,
    })
  }
  throw new Error(
    `Runner for "${options.runner}" is not supported (supported runners: tape, playground)`
  )
}
