import { Player } from "../core";

export class MediaSourceController {
  public mediaSource: MediaSource;


  constructor(private player: Player) {
    let hasWebKit = ('WebKitMediaSource' in window);
    let hasMediaSource = ('MediaSource' in window);

    if (hasMediaSource) {
      this.mediaSource = new MediaSource();
    } else if (hasWebKit) {
      // @ts-ignore
      this.mediaSource = new WebKitMediaSource();
    }
  }

  public attachMediaSource(video: HTMLVideoElement) {
    let objectURL = window.URL.createObjectURL(this.mediaSource);
    video.src = objectURL;
    return objectURL;
  }

  public detachMediaSource(video: HTMLVideoElement) {
    video.removeAttribute('src');
  }

  public setDuration(value: number | null) {
    if (!this.mediaSource || this.mediaSource.readyState !== 'open') return;
    if (value === null || isNaN(value)) return;
    if (this.mediaSource.duration === value) return;

    if (!MediaSourceController.isBufferUpdating(this.mediaSource)) {
      this.mediaSource.duration = value;
    } else {
      setTimeout(this.setDuration.bind(this, value), 50);
    }
  }

  public setSeekable(start: number, end: number) {
    if (this.mediaSource && typeof this.mediaSource.setLiveSeekableRange === 'function' && typeof this.mediaSource.clearLiveSeekableRange === 'function' &&
      this.mediaSource.readyState === 'open' && start >= 0 && start < end) {
      this.mediaSource.clearLiveSeekableRange();
      this.mediaSource.setLiveSeekableRange(start, end);
    }
  }

  static signalEndOfStream(source: MediaSource) {
    if (!source || source.readyState !== 'open') {
      return;
    }

    let buffers = source.sourceBuffers;

    for (let i = 0; i < buffers.length; i++) {
      if (buffers[i].updating) {
        return;
      }
      if (buffers[i].buffered.length === 0) {
        return;
      }
    }
    source.endOfStream();
  }

  static isBufferUpdating(source: MediaSource) {
    let buffers = source.sourceBuffers;
    for (let i = 0; i < buffers.length; i++) {
      if (buffers[i].updating) {
        return true;
      }
    }
    return false;
  }
}

