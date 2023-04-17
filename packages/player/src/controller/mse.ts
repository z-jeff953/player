import EventEmitter from 'events'

class MediaSourceController extends EventEmitter {
  private mediaSource: MediaSource
  private videoSourceBuffer: SourceBuffer | null
  private audioSourceBuffer: SourceBuffer | null

  constructor() {
    super()
    this.mediaSource = new MediaSource()
    this.videoSourceBuffer = null
    this.audioSourceBuffer = null
    this.init()
  }

  async init() {
    // 等待 MediaSource 打开
    await this.mediaSource.open()
    // 创建视频和音频的 SourceBuffer
    this.videoSourceBuffer = this.mediaSource.addSourceBuffer(
      'video/mp4; codecs="avc1.64001e"'
    )
    this.audioSourceBuffer = this.mediaSource.addSourceBuffer(
      'audio/mp4; codecs="mp4a.40.2"'
    )
    // 监听 SourceBuffer 的更新事件
    this.videoSourceBuffer.addEventListener(
      'updateend',
      this.onVideoSourceBufferUpdateEnd
    )
    this.audioSourceBuffer.addEventListener(
      'updateend',
      this.onAudioSourceBufferUpdateEnd
    )
  }

  // 向视频的 SourceBuffer 中追加媒体片段
  async appendVideoMediaSegment(segment: ArrayBuffer) {
    if (this.videoSourceBuffer) {
      // 等待 SourceBuffer 就绪
      await new Promise(resolve => {
        if (this.videoSourceBuffer) {
          if (this.videoSourceBuffer.updating) {
            this.videoSourceBuffer.addEventListener(
              'updateend',
              () => {
                resolve()
              }
            )
          } else {
            resolve()
          }
        } else {
          resolve()
        }
      })
      // 向 SourceBuffer 中追加视频数据
      this.videoSourceBuffer.appendBuffer(segment)
    }
  }

  // 向音频的 SourceBuffer 中追加媒体片段
  async appendAudioMediaSegment(segment: ArrayBuffer) {
    if (this.audioSourceBuffer) {
      // 等待 SourceBuffer 就绪
      await new Promise(resolve => {
        if (this.audioSourceBuffer) {
          if (this.audioSourceBuffer.updating) {
            this.audioSourceBuffer.addEventListener(
              'updateend',
              () => {
                resolve()
              }
            )
          } else {
            resolve()
          }
        } else {
          resolve()
        }
      })
      // 向 SourceBuffer 中追加音频数据
      this.audioSourceBuffer.appendBuffer(segment)
    }
  }

  // 处理视频 SourceBuffer 更新完成事件
  private onVideoSourceBufferUpdateEnd = () => {
    this.emit('videoupdateend')
  }

  // 处理音频 SourceBuffer 更新完成事件
  private onAudioSourceBufferUpdateEnd = () => {
    this.emit('audioupdateend')
  }

  // 关闭 MediaSourceController
  async close() {
    if (this.mediaSource.readyState === 'open') {
      await this.mediaSource.endOfStream()
    }
  }
}

export default MediaSourceController
