export interface IQuality {
  id: string;
  bandwidth: string;
  width: number;
  height: number;
}

export interface ITimelineEntry {
  start: number;
  startSeconds: number;
  length: number;
  lengthSeconds: number;
}

export interface IStream {
  streamType: string;
  mimeType: string;
  codecs: string;
  initUrlFormat: string;
  fragUrlFormat: string;
  qualities: IQuality[];
  timeline: ITimelineEntry[];
}


export interface IManifest {
  baseUrl: string;
  mediaDuration: number;
  streams: Record<string, IStream>;
}
