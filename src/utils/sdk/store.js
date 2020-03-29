import store from 'store'
import { storeConfig } from '../commonConfig'

export const appId = storeConfig.APP_ID

export const get = key => store.get(`${appId}-${key}`)

export const set = (key, value) => {
  store.set(`${appId}-${key}`, value)
}

export const remove = (key) => {
  store.remove(`${appId}-${key}`)
}

export const clear = () => {
  store.clearAll()
}
