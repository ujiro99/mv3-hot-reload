import { isDev, Message } from './utils'

export function init() {
  if (isDev) {
    chrome.runtime.onMessage.addListener((message) => {
      if (message === Message.Reload) {
        chrome.tabs.query({ active: true }).then(() => {
          chrome.runtime.reload()
          chrome.tabs.reload()
        })
      }
    })
  }
}
