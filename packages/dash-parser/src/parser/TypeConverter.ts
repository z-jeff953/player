import { ConvertedMpd, MpdModel } from '../types'

export function parseOptionalInt(
  value: string | undefined
): number | undefined {
  if (value === undefined) return undefined
  return parseInt(value)
}

class TypeConverter {
  convertSegmentTimelineElement(
    element: ConvertedMpd.SegmentTimelineElement
  ): MpdModel.SegmentTimelineElement {
    return {
      ...element,
      t: parseOptionalInt(element.t),
      d: parseInt(element.d),
      r: parseOptionalInt(element.r)
    }
  }

  convertSegmentTimeline(
    timeline: ConvertedMpd.SegmentTimeline
  ): MpdModel.SegmentTimeline {
    return {
      ...timeline,
      timescale: parseOptionalInt(timeline.timescale),
      S: timeline.S?.map(this.convertSegmentTimelineElement) || []
    }
  }

  convertSegmentTemplate(
    template: ConvertedMpd.SegmentTemplate | undefined
  ): MpdModel.SegmentTemplate {
    if (!template) {
      throw new Error('Template is undefined'); // 可以抛出一个错误或者根据需求进行处理
    }
    return {
      ...template,
      startNumber: parseOptionalInt(template?.startNumber),
      presentationTimeOffset: parseOptionalInt(
        template?.presentationTimeOffset
      ),
      indexRangeExact: Boolean(template?.indexRangeExact),
      timescale: parseInt(template?.timescale),
      SegmentTimeline: this.convertSegmentTimeline(
        template?.SegmentTimeline
      )
    }
  }

  convertRepresentation(
    representation: ConvertedMpd.Representation
  ): MpdModel.Representation {
    return {
      ...representation,
      segmentAlignment: Boolean(representation.segmentAlignment),
      bitstreamSwitching: Boolean(representation.bitstreamSwitching),
      bandwidth: parseInt(representation.bandwidth),
      width: parseOptionalInt(representation.width),
      height: parseOptionalInt(representation.height),
      startWithSAP: parseOptionalInt(representation.startWithSAP),
      SegmentTemplate: this.convertSegmentTemplate(
        representation.SegmentTemplate as ConvertedMpd.SegmentTemplate
      ),
      AudioChannelConfiguration: representation.AudioChannelConfiguration?.map(({ value, schemeIdUri }) => ({ value: parseInt(value), schemeIdUri }))
    }
  }

  convertAdaptationSet(
    adaptationSet: ConvertedMpd.AdaptationSet
  ): MpdModel.AdaptationSet {
    return {
      ...adaptationSet,
      segmentAlignment: Boolean(adaptationSet.segmentAlignment),
      bitstreamSwitching: Boolean(adaptationSet.bitstreamSwitching),
      SegmentTemplate: this.convertSegmentTemplate(adaptationSet?.SegmentTemplate as unknown as ConvertedMpd.SegmentTemplate),
      Representation: adaptationSet.Representation.map(this.convertRepresentation) || []
    }
  }

  convertPeriod(period: ConvertedMpd.Period): MpdModel.Period {
    if (!period || !period.AdaptationSet) {
      throw new Error('Template or convertAdaptationSet is undefined'); // 可以抛出一个错误或者根据需求进行处理
    }
    return {
      ...period,
      AdaptationSet: period.AdaptationSet?.map(
        this.convertAdaptationSet
      ) || []
    }
  }

  convertMpd = (convertedMpd: ConvertedMpd.Mpd): MpdModel.Mpd => {
    return {
      ...convertedMpd,
      baseUrl: convertedMpd.baseUrl || '',
      Period: convertedMpd.Period.map(this.convertPeriod)
    }
  }
}

export const typeConverter = new TypeConverter()
