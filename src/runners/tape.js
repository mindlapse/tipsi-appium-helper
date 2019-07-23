import path from 'path'
import tape from 'tape'
import tapDiff from 'tap-diff'
import globPlatformFiles from '../core/glob-platform-files'

/* eslint global-require: 0 import/no-dynamic-require: 0 */
export default function runTapeTests({ paths, platform }) {
  console.log("In runTapeTests")
  return new Promise((resolve) => {
      // Specify tap-diff reporter
    tape.createStream()
      .pipe(tapDiff())
      .pipe(process.stdout)

    const cwd = process.cwd()
    console.log(`cwd is ${cwd}`)

    globPlatformFiles(paths, platform).forEach(
      file => {
        console.log("File", file)
        require(path.resolve(cwd, file))
      }
    )
    console.log("Calling tape.onFinish")
    tape.onFinish(resolve)
  })
}
