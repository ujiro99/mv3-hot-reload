import { isDev, Message, PORT } from './utils'

export function init() {
  if (isDev) {
    const ws = new WebSocket(`ws://localhost:${PORT}`)
    ws.addEventListener('message', (event) => {
      if (event.data === Message.FileChange) {
        chrome.runtime.sendMessage(Message.Reload)
      }
    })
  }
}
