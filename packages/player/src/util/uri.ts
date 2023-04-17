type QueryString = string
type QueryObj = {
  [key: string]: string | number
}

function parseQueryString(queryString: QueryString): QueryObj {
  const params: QueryObj = {}
  const urlSearchParams = new URLSearchParams(queryString)

  urlSearchParams.forEach((value, key) => {
    params[key] = decodeURIComponent(value)
  })

  return params
}

function stringifyQueryString(params: QueryObj): QueryString {
  const urlSearchParams = new URLSearchParams()

  Object.keys(params).forEach(key => {
    urlSearchParams.set(key, encodeURIComponent(params[key]))
  })

  const str = urlSearchParams.toString()
  return str === '' ? str : `?${urlSearchParams.toString()}`
}

function mergeQueryString(
  queryString: QueryString,
  params: QueryObj
): QueryString {
  const parsedParams = parseQueryString(queryString)
  const mergedParams = { ...parsedParams, ...params }

  return stringifyQueryString(mergedParams)
}

export { parseQueryString, stringifyQueryString, mergeQueryString }
