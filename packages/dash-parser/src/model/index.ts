import { MpdModel } from '../types/MpdModel'
import { DashManifestModel } from '../types/DashManifestModel'
export class DashManifestModelImpl implements DashManifestModel {
  mpd: MpdModel.Mpd
  baseUrl: string

  constructor(mpd: MpdModel.Mpd, baseUrl?: string) {
    this.mpd = mpd
    if(baseUrl) this.baseUrl = baseUrl
  }

  // 获取某个Period下所有的AdaptationSet
  getAdaptationSets(periodId: string): MpdModel.AdaptationSet[] {
    const period = this.mpd.Period.find(period => period.id === periodId);
    if (period) {
      return period.AdaptationSet;
    } else {
      return [];
    }
  }
  
  // 获取某个AdaptationSet下所有的Representation
  getRepresentations(adaptationSetId: string): MpdModel.Representation[] {
    const adaptationSet = this.mpd.Period.flatMap(period => period.AdaptationSet).find(adaptationSet => adaptationSet.id === adaptationSetId);
    if (adaptationSet) {
      return adaptationSet.Representation;
    } else {
      return [];
    }
  }
  
  // 获取某个Representation的最后一个Segment的时间戳
  getLastSegmentTimestamp(representationId: string): number {
    const representation = this.mpd.Period.flatMap(period => period.AdaptationSet.flatMap(adaptationSet => adaptationSet.Representation)).find(representation => representation.id === representationId);
    if (representation) {
      const segmentTemplate = representation.SegmentTemplate?.[0];
      const segmentTimeline = segmentTemplate.SegmentTimeline;
      const lastSegment = segmentTimeline.S[segmentTimeline.S.length - 1];
      const timescale = parseInt(segmentTemplate.timescale);
      const segmentDuration = parseInt(lastSegment.d);
      const segmentTime = parseInt(lastSegment.t);
      const repeatCount = parseInt(lastSegment.r) || 0;
      return (segmentTime + (segmentDuration * repeatCount)) / timescale;
    }
    return 0;
  }
  
  // 获取某个Representation的第一个Segment的时间戳
  getFirstSegmentTimestamp(representationId: string): number {
    const representation = this.mpd.Period.flatMap(period => period.AdaptationSet.flatMap(adaptationSet => adaptationSet.Representation)).find(representation => representation.id === representationId);
    if (representation) {
      const segmentTemplate = representation.SegmentTemplate?.[0];
      const segmentTimeline = segmentTemplate.SegmentTimeline;
      const firstSegment = segmentTimeline.S[0];
      const timescale = parseInt(segmentTemplate.timescale);
      const segmentDuration = parseInt(firstSegment.d);
      const segmentTime = parseInt(firstSegment.t);
      return segmentTime / timescale;
    }
    return 0;
  }
  
  // 获取某个Representation的所有Segment的时间戳数组
  getAllSegmentTimestamps(representationId: string): number[] {
    const representation = this.mpd.Period.flatMap(period => period.AdaptationSet.flatMap(adaptationSet => adaptationSet.Representation)).find(representation => representation.id === representationId);
    if (representation) {
      const segmentTemplate = representation.SegmentTemplate?.[0];
      const segmentTimeline = segmentTemplate.SegmentTimeline;
      const timescale = parseInt(segmentTemplate.timescale);
      const segmentDuration = parseInt(segmentTemplate.S[0].d);
      const segmentTime = parseInt(segmentTemplate.S[0].t);
      const repeatCount = parseInt(segmentTemplate.S[0].r) || 0;
      const timestamps: number[] = [];
      for (const s of segmentTimeline.S) {
        const t = parseInt(s.t);
        const d = parseInt(s.d);
        const r = parseInt(s.r) || 0;
        for (let i = 0; i <= r; i++) {
          const timestamp = (segmentTime + (d * i)) / timescale;
          timestamps.push(timestamp);
        }
      }
      return timestamps;
    }
    return [];
  }

  // 根据时间戳获取某个AdaptationSet下的对应Segment的URL
  getSegmentUrl(adaptationSetId: string, timestamp: number): string {
    const adaptationSet = this.mpd.Period.flatMap(period => period.AdaptationSet).find(adaptationSet => adaptationSet.id === adaptationSetId);
    if (adaptationSet) {
      const representation = adaptationSet.Representation[0]; // 这里假设每个 AdaptationSet 只有一个 Representation
      const segmentTemplate = representation.SegmentTemplate?.[0] || {} as MpdModel.SegmentTemplate;
      const timescale = segmentTemplate.timescale;
      const startNumber = segmentTemplate.startNumber || 0;
      const segmentDuration = segmentTemplate.SegmentTimeline.S[0].d;
      const segmentTimeline = segmentTemplate.SegmentTimeline;
      let segmentTime = 0;
      for (const s of segmentTimeline.S) {
        const t = s.t
        const d = s.d
        const r = s.r || 0;
        if (timestamp >= segmentTime && timestamp < segmentTime + d) {
          const segmentNumber = Math.floor((timestamp - segmentTime) / segmentDuration) + startNumber;
          const segmentUrl = segmentTemplate.media
            .replace('$RepresentationID$', representation.id)
            .replace('$Number%05d$', String(segmentNumber));
          return this.baseUrl + segmentUrl;
        }
        segmentTime += d + (r * segmentDuration);
      }
    }
    return '';
  }
  
  // 获取某个Representation的所有Segment的URL数组
  getAllSegmentUrls(representationId: string): string[] {
    const representation = this.mpd.Period.flatMap(period => period.AdaptationSet.flatMap(adaptationSet => adaptationSet.Representation)).find(representation => representation.id === representationId);
    if (representation) {
      const segmentTemplate = representation.SegmentTemplate?.[0] as MpdModel.SegmentTemplate;
      const segmentTimeline = segmentTemplate.SegmentTimeline;
      const timescale = segmentTemplate.timescale;
      const segmentDuration = segmentTemplate.SegmentTimeline.S[0].d

      const segmentTime = segmentTemplate.SegmentTimeline.S[0].t || 0;
      const repeatCount = segmentTemplate.SegmentTimeline.S[0].r;
      const segmentUrls: string[] = [];
      for (const s of segmentTimeline.S) {
        const t = s.t;
        const d = s.d
        const r = s.r || 0;
        for (let i = 0; i <= r; i++) {
          const timestamp = (segmentTime + (d * i)) / timescale;
          const segmentUrl = this.getSegmentUrl(representation.id, timestamp);
          segmentUrls.push(segmentUrl);
        }
      }
      return segmentUrls;
    }
    return [];
  }
}
  // getAdaptationSets(periodId: string): MpdModel.AdaptationSet[] {
  //   const period = this.mpd.Period.find(
  //     period => period.id === periodId
  //   )
  //   if (!period) {
  //     throw new Error(`Period with id "${periodId}" not found`)
  //   }
  //   return period.AdaptationSet
  // }

  // getRepresentations(adaptationSetId: string): MpdModel.Representation[] {
  //   const adaptationSet = this.getAdaptationSet(adaptationSetId)
  //   return adaptationSet.Representation
  // }

  // getSegmentUrl(adaptationSetId: string, timestamp: number): string {
  //   const adaptationSet = this.getAdaptationSet(adaptationSetId)
  //   const representation = adaptationSet.Representation[0]
  //   const segmentIndex = this.getSegmentIndex(
  //     representation,
  //     timestamp
  //   )
  //   const template = representation.SegmentTemplate?.[0]
  //   const mediaUrl = template?.media
  //     .replace('$RepresentationID$', representation.id)
  //     .replace('$Time$', `${segmentIndex}`)
  //   return `${this.baseUrl}/${mediaUrl}`
  // }

  // getLastSegmentTimestamp(representationId: string): number {
  //   const representation = this.getRepresentation(representationId)
  //   const template = representation.SegmentTemplate?.[0]
  //   const timeline = template?.SegmentTimeline
  //   return (timeline?.S || []).map(s => s.t).pop() || -1
  // }

  // getFirstSegmentTimestamp(representationId: string): number {
  //   const representation = this.getRepresentation(representationId)
  //   const template = representation.SegmentTemplate?.[0]
  //   const timeline = template?.SegmentTimeline
  //   return (timeline?.S || [])[0].t || -1
  // }

  // getAllSegmentTimestamps(representationId: string): number[] {
  //   const representation = this.getRepresentation(representationId)
  //   const template = representation.SegmentTemplate?.[0]
  //   const timeline = template?.SegmentTimeline
  //   return (timeline?.S || []).map(s => s.t || -1)
  // }

  // getAllSegmentUrls(representationId: string): string[] {
  //   const representation = this.getRepresentation(representationId)
  //   const template = representation.SegmentTemplate?.[0]
  //   const timeline = template?.SegmentTimeline
  //   return (timeline?.S || []).map(s => {
  //     const mediaUrl = template?.media
  //       .replace('$RepresentationID$', representation.id)
  //       .replace('$Time$', `${s.t}`)
  //     return `${this.baseUrl}/${mediaUrl}`
  //   })
  // }

  // private getAdaptationSet(adaptationSetId: string): MpdModel.AdaptationSet {
  //   const adaptationSet = this.mpd.Period.flatMap(period =>
  //     period.AdaptationSet.find(as => as.id === adaptationSetId)
  //   )[0]
  //   if (!adaptationSet) {
  //     throw new Error(
  //       `AdaptationSet with id "${adaptationSetId}" not found`
  //     )
  //   }
  //   return adaptationSet
  // }

  // private getRepresentation(
  //   representationId: string
  // ): MpdModel.Representation {
  //   const representation = this.mpd.Period.flatMap(period =>
  //     period.AdaptationSet.flatMap(as =>
  //       as.Representation.find(rep => rep.id === representationId)
  //     )
  //   )[0]
  //   if (!representation) {
  //     throw new Error(
  //       `Representation with id "${representationId}" not found`
  //     )
  //   }
  //   return representation
  // }


  // private getSegmentIndex(representation: MpdModel.Representation, timestamp: number): number {
  //   const template = representation.SegmentTemplate?.[0];
  //   const timeline = template?.SegmentTimeline;
  //   const timescales = timeline?.timescale || 1;
  //   const segments = (timeline?.S || []);

  //   let time = 0;
  //   let index = 0;

  //   for (let i = 0; i < segments.length; i++) {
  //     const segment = segments[i];
  //     const duration = segment.d * (segment.r || 1);
  //     if (time + duration / timescales > timestamp) {
  //       return index + Math.floor((timestamp - time) * timescales / segment.d);
  //     }
  //     time += duration / timescales;
  //     index += segment.r || 1;
  //   }

  //   return index - 1;
  // }
// }

