import { DashParser } from '../src/parser/index'
import { parsedMpd, xmlString, mpdModel } from './data'
describe('DashParser parseXml', () => {
  it('should parse an MPD XML string to ConvertedMpd', () => {
    const dashParser = new DashParser()

    const result = dashParser.parseXml(xmlString)
    expect(result).toEqual(parsedMpd)
  })

  it('should parse ConvertedMpd to an MpdModel', () => {
    const dashParser = new DashParser()

    const result = dashParser.parseMpd(parsedMpd)
    expect(result).toEqual(mpdModel)
  })

  it('should parse an MPD XML string to an MpdModel', () => {
    const dashParser = new DashParser()

    const result = dashParser.parse(xmlString)
    expect(result).toEqual(mpdModel)
  })
})
