export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// 继承promise的泛型接口
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

// 报错定义
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

// 接口扩展
export interface Axios {
  request<T>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 混合类型 为了axios({}) 调用
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  // 重载的定义类型
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
