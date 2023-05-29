// 引入 URI Util 模块中的函数
import {
  stringifyQueryString,
  mergeQueryString
} from './uri'

// XHRConfig 接口定义了 XHR 类的配置项
interface XHRConfig {
  url?: string
  type?: XMLHttpRequestResponseType
  method?: 'GET' | 'POST' | 'get' | 'post'
  data?: Record<string, string | number>
  query?: Record<string, string | number>
}

// XHR 类用于发送 XMLHttpRequest 请求
function request(
  {
    url,
    method = 'GET',
    type = 'arraybuffer',
    data = {},
    query = {}
  }: XHRConfig = {}
) {
  // 返回一个 Promise 对象，处理异步请求
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error('no url'))
      return
    }

    // 创建 XMLHttpRequest 实例
    const xhr = new XMLHttpRequest()
    xhr.responseType = type

    const _method = method.toUpperCase()

    // 将 URL 拆分为 base URL 和查询字符串
    const splitUrls = url.split('?')
    splitUrls.push('')
    const _url = url + mergeQueryString(splitUrls[1], query)

    // 打开连接
    xhr.open(_method, _url)

    // 监听 onload 事件，处理请求成功的情况
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 206) {
        resolve(xhr)
      } else {
        reject(xhr)
      }
    }

    // 监听 onerror 事件，处理请求失败的情况
    xhr.onerror = () => reject(xhr)

    // 根据请求方法发送请求
    if (_method === 'GET') {
      xhr.send()
    } else {
      xhr.send(stringifyQueryString(data))
    }
  }) as Promise<XMLHttpRequest>
}

// fetchBuffer 函数以二进制格式请求指定 URL
function fetchBuffer(url: string): Promise<ArrayBuffer> {
  return request({ url }).then(xhr => xhr.response)
}


function fetchXml(url: string) {
  return request({ url, type: 'text' }).then(xhr => xhr.response)
}


// FnConfig 类型定义了可以传递给 get 和 post 函数的配置项
type RequestFnConfig = Omit<XHRConfig, 'method'> | string

// get 函数用于发送 GET 请求
function get(config: Omit<XHRConfig, 'method'> | string) {
  if (typeof config === 'string') {
    return request({ url: config })
  }
  const _config: XHRConfig = { ...config }
  _config.method = 'GET'
  return request(_config)
}

// post 函数用于发送 POST 请求
function post(config: Omit<XHRConfig, 'method'> | string) {
  if (typeof config === 'string') {
    return request({ url: config })
  }
  const _config: XHRConfig = { ...config }
  _config.method = 'POST'
  return request(_config)
}

// 导出函数和接口
export {
  get,
  post,
  request as createXHR,
  fetchBuffer,
  fetchXml,
  request,
  XHRConfig,
  RequestFnConfig as FnConfig
}
