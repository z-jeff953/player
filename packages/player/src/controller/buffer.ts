import { Player } from "../core";

export interface BufferControllerConfig {
  type: string;
  codecs: string[];
}

export class BufferController {
  public sourceBuffer: SourceBuffer | null = null
  public initLoaded = false

  private queue: ArrayBuffer[] = []
  private updating = false

  constructor(
    private mediaSource: MediaSource,
    private config: BufferControllerConfig,
    private player: Player
  ) {
    this.player.logger.info(`addSourceBuffer: ${this.config.type}; codecs="${this.config.codecs.join(',')}"`)
    this.sourceBuffer = this.mediaSource.addSourceBuffer(`${this.config.type}; codecs="${this.config.codecs.join(',')}"`);
    this.init();
  }

  init() {
    // this.mediaSource.addEventListener('sourceopen', () => {
    // this.sourceBuffer && this.sourceBuffer.addEventListener('updateend', () => {
    //   this.updating = false
    //   if (this.queue.length > 0) {
    //     this.appendBuffer(this.queue.shift()!)
    //   }
    // })
    // if (this.queue.length > 0) {
    //   this.appendBuffer(this.queue.shift()!)
    // }

    // })
  }

  public appendBuffer(buffer: ArrayBuffer) {
    this.sourceBuffer!.appendBuffer(buffer)

    // if (!this.sourceBuffer) {
    //   this.queue.push(buffer)
    //   return
    // }
    // if (this.updating) {
    //   this.queue.push(buffer)
    //   return
    // }
    // try {
    //   this.updating = true
    //   this.sourceBuffer.appendBuffer(buffer)
    // } catch (err) {
    //   this.updating = false
    //   this.queue.unshift(buffer)
    //   console.warn('appendBuffer error', err)
    // }
  }

  public endOfStream() {
    if (!this.sourceBuffer) return
    try {
      this.sourceBuffer.addEventListener('updateend', () => {
        this.mediaSource.endOfStream()
      })
      if (!this.updating) {
        this.mediaSource.endOfStream()
      }
    } catch (err) {
      console.warn('endOfStream error', err)
    }
  }

  public remove(start: number, end: number) {
    if (!this.sourceBuffer) return
    try {
      this.sourceBuffer.remove(start, end)
    } catch (err) {
      console.warn('remove error', err)
    }
  }

  public dispose() {
    this.queue = []
    this.updating = false
    if (this.sourceBuffer) {
      try {
        this.sourceBuffer.abort()
      } catch (err) {
        console.warn('abort error', err)
      }
      this.sourceBuffer.removeEventListener('updateend', () => { })
      this.mediaSource.removeSourceBuffer(this.sourceBuffer)
      this.sourceBuffer = null
    }
    this.mediaSource.removeEventListener('sourceopen', () => { })
  }
}