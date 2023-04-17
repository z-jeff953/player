import X2JS from 'x2js'
import { ConvertedMpd, MpdModel } from '../types'
import { DashConstants } from '../constant/DashConstants'
import { typeConverter } from './TypeConverter'

interface DashParserConfig {}

export class DashParser {
  private converter
  private config: DashParserConfig

  constructor(config?: DashParserConfig) {
    this.config = config || {}
    this.converter = new X2JS({
      escapeMode: false,
      attributePrefix: '',
      emptyNodeForm: 'object',
      ignoreRoot: true,
      arrayAccessFormPaths: DashConstants.ALWAYS_ARRAY_ELEMENTS
    })
  }

  parseXml(xmlString: string): ConvertedMpd.Mpd {
    return this.ignoreXmlProperty(this.converter.xml2js(xmlString))
  }

  parse(xmlString: string): MpdModel.Mpd {
    return this.ignoreXmlProperty(
      this.parseMpd(this.parseXml(xmlString))
    )
  }

  parseMpd(convertedMpd: ConvertedMpd.Mpd): MpdModel.Mpd {
    return this.ignoreXmlProperty(
      typeConverter.convertMpd(convertedMpd)
    )
  }

  private ignoreXmlProperty(obj: Record<string, any>): any {
    delete obj['xmlns']
    delete obj['xmlns:xsi']
    delete obj['xmlns:xlink']
    delete obj['xsi:schemaLocation']
    return obj
  }
}
