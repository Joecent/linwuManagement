import axios from 'axios'
import { Message } from 'element-ui'
import * as store from './sdk/store'
axios.defaults.withCredentials = true
export const get = (cmd, params) => {
  const newParams = { ...params }
  // newParams.sessionId = store.get('sessionId') || 'undefined';
  // newParams.appId = store.appId;
  // newParams.dataType = 'JSONP';
  return axios.get(cmd, {
    params: newParams
  }).then((res) => {
    if (res.data.code) {
      Message.error(res.data.message)
      return false
    }
    return res.data
  })
}
export const post = (cmd, params) => {
  const newParams = { ...params }

  // newParams.sessionId = store.get('sessionId') || 'undefined';
  // newParams.appId = store.appId;

  return axios.post(cmd, newParams).then((res) => {
    if (res.data.code) {
      Message.error(res.data.message)
      return false
    }
    return res.data
  })
}
