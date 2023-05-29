import { mergeQueryString, stringifyQueryString } from "../util"
import { Player } from "../core"

export interface RequestConfig {
  url?: string
  type?: XMLHttpRequestResponseType
  method?: 'GET' | 'POST' | 'get' | 'post'
  data?: Record<string, string | number>
  query?: Record<string, string | number>
  retry?: number
}


export interface RequestResult<T = any> {
  promise: Promise<T>
  abort: () => void
}

export class RequestController {
  private concurrency: number
  private queue: Array<() => Promise<any>>
  private activeCount: number

  constructor(concurrency: number, private player: Player) {
    this.concurrency = concurrency
    this.queue = []
    this.activeCount = 0
  }

  private async processQueue() {
    console.warn('start', this.activeCount)
    while (this.activeCount < this.concurrency && this.queue.length > 0) {
      const request = this.queue.shift()!
      this.activeCount++
      request().finally(() => {
        this.activeCount--
        this.processQueue()
      })
    }
    console.warn('end', this.activeCount)
  }

  public request<T = any>(
    config: RequestConfig = {},
    callback?: (error: Error | null, data?: T) => void
  ): RequestResult<T> | void {

    console.warn('request', this.activeCount, this.concurrency, this.queue)
    const { url, type = 'json', method = 'GET', data, query } = config
    let retry = config?.retry ?? 0

    let requestUrl = url!
    if (query) {
      requestUrl += stringifyQueryString(query)
    }

    let xhr = new XMLHttpRequest()
    let aborted = false
    const promise = new Promise<T>((resolve, reject) => {
      xhr.responseType = type

      xhr.onload = () => {
        console.warn('onload', xhr)
        if (xhr?.status === 200) {
          const data = xhr.response
          if (callback) {
            callback(null, data)
          }
          resolve(data)
        } else {
          const error = new Error(`Request failed with status ${xhr?.status}`)
          if (callback) {
            callback(error)
          }
          reject(error)
        }
      }

      xhr.onerror = () => {
        if (!aborted && retry > 0) {
          setTimeout(() => {
            aborted = true
            xhr?.abort()
            retry--
            this.request({ ...config, retry }, callback)
          }, 1000)
        } else {
          const error = new Error('Network error')
          if (callback) {
            callback(error)
          }
          reject(error)
        }
      }

    })


    const wrappedRequest = () => {
      return new Promise((resolve, reject) => {
        xhr.open(method.toUpperCase(), requestUrl)
        data && xhr.send(stringifyQueryString(data))
      })
    }

    this.queue.push(wrappedRequest)

    this.processQueue()

    return {
      promise,
      abort: () => {
        if (xhr?.readyState !== 4) {
          aborted = true
          xhr?.abort()
        }
      },
    }
  }
}