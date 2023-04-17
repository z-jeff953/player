import { DashManifestModelImpl } from '../src/model/index'
import { parsedMpd, xmlString } from './data'

describe('DashManifestModel Test', () => {
  it('', () => {
    const model = new DashManifestModelImpl(parsedMpd, './')
  })
})
