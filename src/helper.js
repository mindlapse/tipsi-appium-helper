import { remote } from 'webdriverio'
import plugins from './plugins'

class Helper {
  driver = null
  config = {}

  constructor() {
    plugins.extend(this)
  }

  init = async (config) => {
    if (this.driver) {
      return
    }
    this.config = config
    this.driver = remote({
      desiredCapabilities: {
        deviceName: config.deviceName,
        platformName: config.platformName,
        platformVersion: config.platformVersion,
        app: config.appPath,
        noReset: config.noReset,
        fullReset: config.fullReset,
        automationName: config.automationName,
        newCommandTimeout: 60000,
        ...config.desiredCapabilities
      },
      path: '/wd/hub',
      host: config.appiumHost,
      port: config.appiumPort,
      connectionRetryTimeout: 1200000, // 20 min
    })
    await this.driver.init()
  }

  release = async () => {
    if (this.driver) {
      await this.driver.end()
      this.driver = null
      this.config = {}
    }
  }
}

// This is singleton
export default new Helper()
