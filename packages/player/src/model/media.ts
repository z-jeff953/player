import { ITimelineEntry } from "@dash-vdk/parser";
import { ManifestModel } from './manifest'

export const INIT_SEGMENT_INDEX = -1

export type TrackTypes = 'video' | 'audio';

export interface Segment {
  uri: string;
  duration: number;
  resolvedUri: string;
  number: number;
  presentationTime: number;
}

export interface Playlist {
  timeline: ITimelineEntry[];
  initSegment: Segment;
  segments: Segment[];
}

export interface Track {
  type: TrackTypes;
  codecs: string;
  playlists: Playlist[];
}

export class MediaModel {
  constructor(
    public video: Track,
    public audio: Track,
    public duration: number,
  ) { }


  static fromManifestModel(manifest: ManifestModel): MediaModel {

    function _formatTrack(track: TrackTypes): Track {
      const { codecs } = manifest.streams[track];
      const playlists = [track].map(_formatPlaylist);
      return { type: track, codecs, playlists };
    }


    function _formatPlaylist(track: TrackTypes): Playlist {
      const stream = manifest.streams[track];
      const timelines = stream.timelines;

      function _formatSegment(uri: string, timeline: ITimelineEntry, segIndex: number): Segment {
        const replacedUri = uri
          .replace('$Number%05d$', segIndex.toString().padStart(5, '0'))
          .replace('$RepresentationID$', stream.qualities[0].id)
        return {
          uri: replacedUri,
          duration: timeline.lengthSeconds,
          resolvedUri: manifest.baseUrl + replacedUri,
          number: segIndex,
          presentationTime: timeline.startSeconds
        }
      }

      const initSegment = _formatSegment(stream.initUrlFormat, timelines[0], INIT_SEGMENT_INDEX);
      const segments = stream.timelines.map((timeline, index) => _formatSegment(stream.fragUrlFormat, timeline, index + 1));

      return { timeline: timelines, initSegment, segments };
    }

    const video = _formatTrack('video');
    const audio = _formatTrack('audio');

    const duration = manifest.mediaDuration;

    return new MediaModel(video, audio, duration);
  }
}


