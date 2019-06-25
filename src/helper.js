import { remote } from 'webdriverio'
import plugins from './plugins'

class Helper {
  driver = null
  config = {}

  constructor() {
    plugins.extend(this)
  }

  init = async (config) => {
    const { LOG_LEVEL } = process.env
    const logLevel = LOG_LEVEL || 'error'

    if (this.driver) {
      return
    }
    this.config = config
    this.driver = await remote({
      capabilities: {
        deviceName: config.deviceName,
        platformName: config.platformName,
        platformVersion: config.platformVersion,
        app: config.appPath,
        noReset: config.noReset,
        fullReset: config.fullReset,
        automationName: config.automationName,
        newCommandTimeout: 60000,
        ...config.capabilities
      },
      path: '/wd/hub',
      hostname: config.appiumHost,
      port: +config.appiumPort,
      logLevel,
      connectionRetryTimeout: 1200000, // 20 min
    })
  }

  release = async () => {
    if (this.driver) {
      this.driver = null
      this.config = {}
    }
  }
}

// This is singleton
export default new Helper()
