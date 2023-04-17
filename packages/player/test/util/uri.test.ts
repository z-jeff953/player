import {
  parseQueryString,
  stringifyQueryString,
  mergeQueryString
} from '../../src/util/uri'

// 测试 URI Util
describe('URIUtil', () => {
  it('should parse query string to JavaScript object', () => {
    const queryString = '?param1=value1&param2=value2&param3=value3'
    const expectedParams = {
      param1: 'value1',
      param2: 'value2',
      param3: 'value3'
    }

    const parsedParams = parseQueryString(queryString)

    expect(parsedParams).toEqual(expectedParams)
  })

  it('should stringify JavaScript object to query string', () => {
    const params = {
      param1: 'value1',
      param2: 'value2',
      param3: 'value3'
    }
    const expectedQueryString =
      '?param1=value1&param2=value2&param3=value3'

    const queryString = stringifyQueryString(params)

    expect(queryString).toBe(expectedQueryString)
  })

  it('should handle special characters in query string', () => {
    const queryString =
      '?param1=value1%20with%20spaces&param2=value2%26with%26symbols'
    const expectedParams = {
      param1: 'value1 with spaces',
      param2: 'value2&with&symbols'
    }

    const parsedParams = parseQueryString(queryString)

    expect(parsedParams).toEqual(expectedParams)
  })

  it('should handle empty query string', () => {
    const queryString = ''
    const expectedParams = {}

    const parsedParams = parseQueryString(queryString)

    expect(parsedParams).toEqual(expectedParams)
  })

  it('should handle empty JavaScript object', () => {
    const params = {}
    const expectedQueryString = ''

    const queryString = stringifyQueryString(params)

    expect(queryString).toBe(expectedQueryString)
  })

  it('should merge JavaScript object with query string', () => {
    const queryString = '?param1=value1&param2=value2'
    const params = {
      param2: 'updatedValue2',
      param3: 'value3'
    }
    const expectedQueryString =
      '?param1=value1&param2=updatedValue2&param3=value3'

    const mergedQueryString = mergeQueryString(queryString, params)

    expect(mergedQueryString).toBe(expectedQueryString)
  })

  it('should handle empty query string in merge', () => {
    const queryString = ''
    const params = {
      param1: 'value1',
      param2: 'value2'
    }
    const expectedQueryString = '?param1=value1&param2=value2'

    const mergedQueryString = mergeQueryString(queryString, params)

    expect(mergedQueryString).toBe(expectedQueryString)
  })

  it('should handle empty JavaScript object in merge', () => {
    const queryString = '?param1=value1&param2=value2'
    const params = {}
    const expectedQueryString = '?param1=value1&param2=value2'

    const mergedQueryString = mergeQueryString(queryString, params)

    expect(mergedQueryString).toBe(expectedQueryString)
  })
})
