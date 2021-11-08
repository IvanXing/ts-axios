import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  // Content-Type 和 content-Type 统一成 Content-Type
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  // Content-Type 大小写不敏感，统一
  normalizeHeaderName(headers, 'Content-Type')

  // 如果没有设置，就赋默认值
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf8'
    }
  }
  return headers
}
