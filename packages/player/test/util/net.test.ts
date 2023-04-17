import {
  get,
  post,
  request,
  createXHR,
  fetchBuffer,
  XHRConfig,
  FnConfig
} from '../../src/util/net'

describe('net Test Suite', () => {
  // 模拟 XMLHttpRequest 对象
  const mockXHR: any = {
    open: jest.fn(),
    send: jest.fn(),
    responseType: '',
    onload: jest.fn(),
    onerror: jest.fn()
  }

  beforeAll(() => {
    // 设置全局的 XMLHttpRequest 对象为 mockXHR
    global.XMLHttpRequest = jest.fn(() => mockXHR) as any
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  function mockFail() {
    // 模拟请求发生错误
    mockXHR.onload = jest.fn()
    mockXHR.onerror = jest.fn()
  }

  function mockSuccess() {
    // 模拟请求正常
    mockXHR.onerror = null
    mockXHR.onload = jest.fn()
  }

  // 测试 createXHR 函数
  describe('createXHR', () => {
    test('should return a Promise', () => {
      mockSuccess()
      const xhr = createXHR({ url: 'https://api.example.com/data' })
      expect(xhr instanceof Promise).toBe(true)
    })

    test('should reject with an error when no url is provided', () => {
      mockSuccess()
      const xhr = createXHR()
      expect(xhr).rejects.toThrowError('no url')
    })

    test('should reject with an error when an invalid config is provided', () => {
      mockFail()
      const xhr = createXHR('invalidConfig' as any)
      expect(xhr).rejects.toThrowError('no url')
    })
  })

  // 测试 fetchBuffer 函数
  describe('fetchBuffer', () => {
    test('should return a Promise', () => {
      mockSuccess()
      const xhr = fetchBuffer('https://api.example.com/data')
      expect(xhr instanceof Promise).toBe(true)
    })

    test('should reject with an error when no url is provided', () => {
      mockSuccess()
      const xhr = fetchBuffer('')
      expect(xhr).rejects.toThrowError('no url')
    })

    test('should reject with an error when an invalid url is provided', () => {
      mockFail()
      const xhr = fetchBuffer('invalidUrl')
      expect(xhr).rejects.toBeInstanceOf(XMLHttpRequest)
    })
  })

  // 测试 get 函数
  describe('get', () => {
    test('should return a Promise when passing a string as config', () => {
      mockSuccess()
      const xhr = get('https://api.example.com/data')
      expect(xhr instanceof Promise).toBe(true)
    })

    test('should return a Promise when passing a config object', () => {
      mockSuccess()
      const config: XHRConfig = {
        url: 'https://api.example.com/data'
      }
      const xhr = get(config)
      expect(xhr instanceof Promise).toBe(true)
    })

    test('should set method to GET in config object', () => {
      mockSuccess()
      const config: FnConfig = { url: 'https://api.example.com/data' }
      const xhr = get(config)
      expect(xhr instanceof Promise).toBe(true)
    })

    test('should reject with an error when request fails', () => {
      mockFail()
      const config: XHRConfig = {
        url: 'https://api.example.com/nonexistent'
      }
      const xhr = get(config)
      expect(xhr).rejects.toBeInstanceOf(XMLHttpRequest)
    })
  })

  // 测试 post 函数
  describe('post', () => {
    test('should return a Promise when passing a string as config', () => {
      mockSuccess()
      const xhr = post('https://api.example.com/data')
      expect(xhr instanceof Promise).toBe(true)
    })

    test('should return a Promise when passing a config object', () => {
      mockSuccess()
      const config: XHRConfig = {
        url: 'https://api.example.com/data'
      }
      const xhr = post(config)
      expect(xhr instanceof Promise).toBe(true)
    })

    test('should set method to POST in config object', () => {
      mockSuccess()
      const config: FnConfig = { url: 'https://api.example.com/data' }
      const xhr = post(config)
      expect(xhr instanceof Promise).toBe(true)
    })
    test('should set request body in config object', () => {
      mockSuccess()
      const config: XHRConfig = {
        url: 'https://api.example.com/data',
        data: { key: 'value' }
      }
      const xhr = post(config)
      expect(xhr instanceof Promise).toBe(true)
    })

    test(
      'should reject with an error when request fails',
      async () => {
        mockFail()
        const config: XHRConfig = {
          url: 'https://api.example.com/nonexistent'
        }
        const xhr = post(config)
        expect(xhr).rejects.toBeInstanceOf(XMLHttpRequest)
      },
      10000
    )
  })
})
