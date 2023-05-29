export type TrackTypes = 'video' | 'audio';

export interface Segment {
  uri: string;
  timeline: number;
  duration: number;
  resolvedUri: string;
  map: SegmentMap;
  number: number;
  presentationTime: number;
}

export interface Attributes {
  NAME: string;
  AUDIO: string;
  SUBTITLES: string;
  RESOLUTION: Resolution;
  CODECS: string;
  BANDWIDTH: number;
  "PROGRAM-ID": number;
  "FRAME-RATE": number;
}

export interface Playlist {
  loaded?: boolean;
  attributes: Attributes;
  uri: string;
  endList: boolean;
  timeline: number;
  resolvedUri: string;
  targetDuration: number;
  discontinuityStarts: number[];
  timelineStarts: TimelineStarts[];
  segments: Segment[];
  mediaSequence: number;
  discontinuitySequence: number;
}

export interface Resolution {
  width: number;
  height: number;
}

export interface SegmentMap {
  uri: string;
  resolvedUri: string;
}

export interface TimelineStarts {
  start: number;
  timeline: number;
}

export interface Track {
  type: TrackTypes;
  codecs: string[];
  playlists: Playlist[];
}

export class MediaModel {
  constructor(
    public video: Track,
    public audio: Track,
    public duration: number,
  ) { }
}