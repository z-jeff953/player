import { MpdModel } from './MpdModel'

type booleanString = 'true' | 'false'
type numberString = string

// 重写一个接口的某些属性 定义一个类型，接受两个泛型参数，T为原始接口，U为新接口
type RewriteProps<T, U> = Omit<T, keyof U> & U

// 定义 ConvertedMpd 命名空间
export namespace ConvertedMpd {
  // 通过交叉类型将 ProgramInformation 接口属性重写为 MpdModel.ProgramInformation 接口属性
  export type ProgramInformation = RewriteProps<
    MpdModel.ProgramInformation,
    {}
  >

  // 通过交叉类型将 ServiceDescription 接口属性重写为 MpdModel.ServiceDescription 接口属性
  export type ServiceDescription = RewriteProps<
    MpdModel.ServiceDescription,
    {}
  >

  // 通过交叉类型将 SegmentTimelineElement 接口属性重写为 MpdModel.SegmentTimelineElement 接口属性
  export type SegmentTimelineElement = RewriteProps<
    MpdModel.SegmentTimelineElement,
    {
      // 自定义的属性重写
      t?: numberString // timestamp of the element
      d: numberString // duration of the element
      r?: numberString // repeat count of the element
    }
  >

  // 通过交叉类型将 SegmentTimeline 接口属性重写为 MpdModel.SegmentTimeline 接口属性
  export type SegmentTimeline = RewriteProps<
    MpdModel.SegmentTimeline,
    {
      // 自定义的属性重写
      timescale?: numberString
      S?: SegmentTimelineElement[]
    }
  >

  // 通过交叉类型将 SegmentTemplate 接口属性重写为 MpdModel.SegmentTemplate 接口属性
  export type SegmentTemplate = RewriteProps<
    MpdModel.SegmentTemplate,
    {
      // 自定义的属性重写
      timescale: numberString
      startNumber?: numberString
      presentationTimeOffset?: numberString
      indexRangeExact?: booleanString
      SegmentTimeline: SegmentTimeline
    }
  >

  // 通过交叉类型将 AdaptationSet 接口属性重写为 MpdModel.AdaptationSet 接口属性
  export type AdaptationSet = RewriteProps<
    MpdModel.AdaptationSet,
    {
      // 自定义的属性重写
      segmentAlignment?: booleanString
      bitstreamSwitching?: booleanString
      Representation: Representation[]
    }
  >

  // 通过交叉类型将 Period 接口属性重写为 MpdModel.Period 接口属性
  export type Period = RewriteProps<
    MpdModel.Period,
    {
      // 自定义的属性重写
      AdaptationSet: AdaptationSet[]
    }
  >

  // 通过交叉类型将 Mpd 接口属性重写为 MpdModel.Mpd 接口属性
  export type Mpd = RewriteProps<
    MpdModel.Mpd,
    {
      // 自定义的属性重写
      Period: Period[]
    }
  >

  // 通过交叉类型将 Representation 接口属性重写为 MpdModel.Representation 接口属性
  export type Representation = RewriteProps<
    MpdModel.Representation,
    {
      // 自定义的属性重写
      bandwidth: numberString
      width?: numberString
      height?: numberString
      startWithSAP?: numberString
      segmentAlignment?: booleanString
      bitstreamSwitching?: booleanString
      SegmentTemplate: SegmentTemplate
      AudioChannelConfiguration?: AudioChannelConfiguration[]
    }
  >
  // 通过交叉类型将 Representation 接口属性重写为 MpdModel.Representation 接口属性
  export type AudioChannelConfiguration = RewriteProps<
    MpdModel.AudioChannelConfiguration,
    {
      value: numberString
    }
  >
}
