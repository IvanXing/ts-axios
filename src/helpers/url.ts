import { isDate, isObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): any {
  if (!params) {
    return url
  }

  // 参数放入键值对
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val // foo: ['bar', 'baz'] -> foo[]=bar&foo[]=baz
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })

    // 键值对参数拼为url
    let serializedParams = parts.join('&')

    if (serializedParams) {
      const markIndex = url.indexOf('#')
      if (markIndex !== -1) {
        url = url.slice(0, markIndex) // 字符串，截取 0 ~ #的url
      }
      // url是否有问号，有问号就是已经有参数了，后面拼&，无参数拼?
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }
  })

  console.log('返回=>', url)
  return url
}
