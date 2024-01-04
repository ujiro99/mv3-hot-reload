export enum Message {
  FileChange = 'file-change',
  Reload = 'reload',
}

export let isDev = true

export let PORT = 9012

type Config = {
  isDev: boolean
  PORT: number
}

export const setConfig = (conf: Config) => {
  if (conf.isDev != null) {
    isDev = conf.isDev
  }
  if (conf.PORT != null) {
    PORT = conf.PORT
  }
}
