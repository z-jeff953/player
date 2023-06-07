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


function getUrlBase(url: string): string {
  const trimmedUrl = url.trim();
  const lastSlashIndex = trimmedUrl.lastIndexOf('/');
  if (lastSlashIndex === -1) {
    // URL中没有斜杠
    return trimmedUrl;
  } else if (lastSlashIndex === trimmedUrl.length - 1) {
    // URL以斜杠结尾，去除最后一个斜杠
    const withoutTrailingSlash = trimmedUrl.slice(0, -1);
    return getUrlBase(withoutTrailingSlash);
  } else {
    // URL中有斜杠，返回最后一个斜杠之前的部分
    return trimmedUrl.slice(0, lastSlashIndex + 1);
  }
}

export { parseQueryString, stringifyQueryString, mergeQueryString, getUrlBase }
