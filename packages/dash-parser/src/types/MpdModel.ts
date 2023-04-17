export namespace MpdModel {
  export interface ProgramInformation {
    title?: string
    __text?: string
    source?: string
    moreInformationURL?: string
    lang?: string
  }

  export interface ServiceDescription {
    id: string
    provider?: string
    type?: string
    lang?: string
  }

  export interface SegmentTimelineElement {
    t?: number // timestamp of the element
    d: number // duration of the element
    r?: number // repeat count of the element
  }

  export interface SegmentTimeline {
    timescale?: number
    S: SegmentTimelineElement[]
  }

  export interface SegmentTemplate {
    timescale: number
    media: string
    initialization?: string
    startNumber?: number
    presentationTimeOffset?: number
    indexRange?: string
    indexRangeExact?: boolean
    SegmentTimeline: SegmentTimeline
  }

  export interface AdaptationSet {
    id: string
    contentType: string
    mimeType?: string
    lang?: string
    startWithSAP?: string
    frameRate?: string
    maxWidth?: string
    maxHeight?: string
    par?: string
    segmentAlignment?: boolean
    bitstreamSwitching?: boolean
    SegmentTemplate?: SegmentTemplate
    Representation: Representation[]
  }

  export interface Period {
    id: string
    start?: string
    duration?: string
    AdaptationSet: AdaptationSet[]
  }

  export interface Mpd {
    id?: string
    baseUrl?: string
    profiles?: string
    type?: string
    availabilityStartTime?: string
    availabilityEndTime?: string
    publishTime?: string
    mediaPresentationDuration?: string
    minimumUpdatePeriod?: string
    minBufferTime?: string
    timeShiftBufferDepth?: string
    suggestedPresentationDelay?: string
    maxSegmentDuration?: string
    maxSubsegmentDuration?: string
    ProgramInformation?: ProgramInformation[]
    ServiceDescription?: ServiceDescription[]
    Period: Period[]
  }

  export interface Representation {
    id: string
    mimeType: string
    codecs: string
    sar?: string
    frameRate?: string
    audioSamplingRate?: string
    bandwidth: number
    width?: number
    height?: number
    startWithSAP?: number
    segmentAlignment?: boolean
    bitstreamSwitching?: boolean
    SegmentTemplate?: SegmentTemplate
    AudioChannelConfiguration?: AudioChannelConfiguration[]
  }

  export interface AudioChannelConfiguration {
    schemeIdUri: string
    value: number
  }
}
