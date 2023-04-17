import { MpdModel } from '../types/MpdModel'
export interface DashManifestModel {
  mpd: MpdModel.Mpd
  baseUrl: string
  // 获取某个Period下所有的AdaptationSet
  getAdaptationSets(periodId: string): MpdModel.AdaptationSet[]

  // 获取某个AdaptationSet下所有的Representation
  getRepresentations(adaptationSetId: string): MpdModel.Representation[]

  // 根据时间戳获取某个AdaptationSet下的对应Segment的URL
  getSegmentUrl(adaptationSetId: string, timestamp: number): string

  // 获取某个Representation的最后一个Segment的时间戳
  getLastSegmentTimestamp(representationId: string): number

  // 获取某个Representation的第一个Segment的时间戳
  getFirstSegmentTimestamp(representationId: string): number

  // 获取某个Representation的所有Segment的时间戳数组
  getAllSegmentTimestamps(representationId: string): number[]

  // 获取某个Representation的所有Segment的URL数组
  getAllSegmentUrls(representationId: string): string[]

}