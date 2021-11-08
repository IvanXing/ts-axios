import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

// 处理xhr的参数
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config) // 在data处理之前先处理header，data有stringfy转化
  config.data = transformRequestData(config)
}

// 处理请求body
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理url
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

// 处理headers
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
