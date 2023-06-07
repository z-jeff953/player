import { Player } from "../core";

export interface BufferControllerConfig {
  type: string;
  codecs: string;
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
    const bufferType = `${this.config.type}; codecs="${this.config.codecs}"`
    this.player.logger.info(`addSourceBuffer: ${bufferType}`)
    this.sourceBuffer = this.mediaSource.addSourceBuffer(bufferType);
    this.init();
  }

  init() {
    this.mediaSource.addEventListener('sourceopen', () => {
      this.sourceBuffer && this.sourceBuffer.addEventListener('updateend', () => {
        this.updating = false
        if (this.queue.length > 0) {
          this.appendBuffer(this.queue.shift()!)
        }
      }, { once: true })
    })
  }

  public appendBuffer(buffer: ArrayBuffer) {
    const _this = this
    if (!_this.sourceBuffer) return

    _this.queue.push(buffer)

    _appendBuffer()

    function _appendBuffer() {
      if (_this.mediaSource.readyState !== 'open') {
        _this.player.logger.warn('mediaSource.readyState is not open')
        return
      }

      if (_this.queue.length === 0) return
      if (_this.updating) {
        setTimeout(() => {
          _appendBuffer()
        }, 10)
      } else {
        _this.updating = true
        _this.sourceBuffer?.addEventListener('updateend', () => {
          _this.updating = false
          if (_this.queue.length > 0) {
            setTimeout(() => {
              _appendBuffer()
            }, 10)
          }
        }, { once: true })
        _this.sourceBuffer!.appendBuffer(_this.queue.shift()!)
      }
    }
  }

  public endOfStream() {
    if (!this.sourceBuffer) return
    try {
      this.sourceBuffer.addEventListener('updateend', () => {
        this.mediaSource.endOfStream()
      }, { once: true })
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