import http from 'http'

export default function appiumIsRunning(host, port) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      method: 'GET',
      host,
      port,
      path: '/wd/hub/status',
    }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Appium is not running on: ${host}:${port}`))
      }
      console.log(`Appium IS running on: ${host}:${port}`)
      return resolve()
    })

    req.on('error', () => {
      reject(new Error(`Appium is not running on: ${host}:${port}`))
    })

    req.end()
  })
}
