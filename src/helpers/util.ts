const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[Object Date]'
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 把from拷贝到to中 返回结果是 T&U 类型 交叉类型
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    // to[key] = from[key] 加了断言
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
