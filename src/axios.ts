import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

// 把原型属性和实例属性 全部拷贝到instance上
function createInstance(): AxiosInstance {
  const context = new Axios()

  const instance = Axios.prototype.request.bind(context)
  // instance 是一个函数， 目的是 axios({}) 可以直接这样调用 request，不用写request

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
