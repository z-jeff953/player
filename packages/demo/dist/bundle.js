;(() => {
  'use strict'
  class e {
    get eventNames() {
      return [...this.listeners.keys()]
    }
    constructor(e = {}) {
      ;(this.emitterConfig = e), (this.listeners = new Map()), (this.onceToWrapper = new Map())
    }
    merge(e) {
      return e.eventNames.forEach(t => {
        const r = e.listeners.get(t),
          i = e.onceToWrapper
        if (r) {
          if (this.listeners.has(t)) {
            const e = this.listeners.get(t)
            r.forEach(t => e.add(t))
          } else this.listeners.set(t, new Set(r))
          i.forEach((e, n) => {
            this.onceToWrapper.set(e, n), r.has(n) &&
              (this.listeners.get(t).add(e), r.delete(n), i.delete(n))
          }), e.removeAllListeners(t)
        }
      }), this
    }
    removeAllListeners(e) {
      if (void 0 === e)
        (this.listeners = new Map()), (this.onceToWrapper = new Map())
      else {
        const t = this.listeners.get(e)
        if (t) {
          for (let e of t) this.onceToWrapper.delete(e)
          this.listeners.delete(e)
        }
      }
    }
    on(e, t) {
      this.listeners.has(e) ||
        this.listeners.set(e, new Set()), this.listeners.get(e).add(t)
    }
    once(e, t) {
      const r = (...i) => {
        t(...i), this.onceToWrapper.delete(t), this.off(e, r)
      }
      this.listeners.has(e) || this.listeners.set(e, new Set())
      const i = this.listeners.get(e)
      this.onceToWrapper.set(t, r), i.add(r)
    }
    emit(e, ...t) {
      var r
      if (
        (
          (null === (r = this.emitterConfig) || void 0 === r
            ? void 0
            : r.onEveryEvent) &&
            this.emitterConfig.onEveryEvent.call(null, e, ...t),
          !this.listeners.has(e)
        )
      )
        return
      const i = [...this.listeners.get(e)]
      for (const r of i) r.call(null, e, ...t)
    }
    emitNewEvent(e, ...t) {
      this.emit(e, ...t)
    }
    onNewEvent(t, r) {
      const i = new e()
      return i.on(t, r), this.merge(i)
    }
    onceNewEvent(t, r) {
      const i = new e()
      return i.once(t, r), this.merge(i)
    }
    off(e, t) {
      const r = this.listeners.get(e)
      ;(t = this.onceToWrapper.get(t) || t), r &&
        (
          r.delete(t),
          this.onceToWrapper.delete(t),
          0 === r.size && this.listeners.delete(e)
        )
    }
    listenerCount(e) {
      const t = this.listeners.get(e)
      return t ? t.size : 0
    }
    addListener(e, t) {
      return this.on(e, t)
    }
    removeListener(e, t) {
      this.off(e, t)
    }
  }
  const t = {
      prefixed: !0,
      requestFullscreen: void 0,
      exitFullscreen: void 0,
      fullscreenElement: void 0,
      fullscreenEnabled: void 0,
      fullscreenchange: void 0,
      fullscreenerror: void 0,
      fullscreen: void 0
    },
    r = [
      [
        'requestFullscreen',
        'exitFullscreen',
        'fullscreenElement',
        'fullscreenEnabled',
        'fullscreenchange',
        'fullscreenerror',
        'fullscreen'
      ],
      [
        'webkitRequestFullscreen',
        'webkitExitFullscreen',
        'webkitFullscreenElement',
        'webkitFullscreenEnabled',
        'webkitfullscreenchange',
        'webkitfullscreenerror',
        '-webkit-full-screen'
      ],
      [
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozFullScreenElement',
        'mozFullScreenEnabled',
        'mozfullscreenchange',
        'mozfullscreenerror',
        '-moz-full-screen'
      ],
      [
        'msRequestFullscreen',
        'msExitFullscreen',
        'msFullscreenElement',
        'msFullscreenEnabled',
        'MSFullscreenChange',
        'MSFullscreenError',
        '-ms-fullscreen'
      ]
    ],
    i = r[0]
  let n
  for (let e = 0; e < r.length; e++)
    if (r[e][1] in document) {
      n = r[e]
      break
    }
  if (n) {
    for (let e = 0; e < n.length; e++) t[i[e]] = n[e]
    t.prefixed = n[0] !== i[0]
  }
  function s(e) {
    return !!e && 'object' == typeof e
  }
  Object.prototype.toString
  const o = window.navigator.userAgent.toLowerCase()
  function u(e) {
    return 'string' == typeof e && Boolean(e.trim())
  }
  function l(e) {
    return s(e) && 1 === e.nodeType
  }
  function a(e) {
    return function(t, r) {
      if (!u(t)) return document[e](null)
      u(r) && (r = document.querySelector(r))
      const i = l(r) ? r : document
      return i[e] && i[e](t)
    }
  }
  function c(e = 'div', t = {}, r = {}, i) {
    const n = document.createElement(e)
    return Object.getOwnPropertyNames(t).forEach(function(e) {
      const r = t[e]
      'textContent' === e
        ? (function(e, t) {
            void 0 === e.textContent
              ? (e.innerText = t)
              : (e.textContent = t)
          })(n, r)
        : (n[e] === r && 'tabIndex' !== e) || (n[e] = r)
    }), Object.getOwnPropertyNames(r).forEach(function(e) {
      n.setAttribute(e, r[e])
    }), i &&
      (function(e, t) {
        ;(function(e) {
          return 'function' == typeof e && (e = e()), (Array.isArray(
            e
          )
            ? e
            : [e])
            .map(
              e => (
                'function' == typeof e && (e = e()),
                l(e) ||
                (function(e) {
                  return s(e) && 3 === e.nodeType
                })(e)
                  ? e
                  : 'string' == typeof e && /\S/.test(e)
                    ? document.createTextNode(e)
                    : void 0
              )
            )
            .filter(e => e)
        })(t).forEach(t => e.appendChild(t))
      })(n, i), n
  }
  function d(e) {
    const t = new URLSearchParams()
    Object.keys(e).forEach(r => {
      t.set(r, encodeURIComponent(e[r]))
    })
    const r = t.toString()
    return '' === r ? r : `?${t.toString()}`
  }
  function h(e) {
    const t = e.trim(),
      r = t.lastIndexOf('/')
    return -1 === r
      ? t
      : r === t.length - 1 ? h(t.slice(0, -1)) : t.slice(0, r + 1)
  }
  function f(
    {
      url: e,
      method: t = 'GET',
      type: r = 'arraybuffer',
      data: i = {},
      query: n = {}
    } = {}
  ) {
    return new Promise((s, o) => {
      if (!e) return void o(new Error('no url'))
      const u = new XMLHttpRequest()
      u.responseType = r
      const l = t.toUpperCase(),
        a = e.split('?')
      a.push('')
      const c =
        e +
        (function(e, t) {
          const r = (function(e) {
            const t = {}
            return new URLSearchParams(e).forEach((e, r) => {
              t[r] = decodeURIComponent(e)
            }), t
          })(e)
          return d(Object.assign(Object.assign({}, r), t))
        })(a[1], n)
      u.open(l, c), (u.onload = function() {
        200 === u.status || 206 === u.status ? s(u) : o(u)
      }), (u.onerror = () => o(u)), 'GET' === l
        ? u.send()
        : u.send(d(i))
    })
  }
  ;({
    get isInWeixin() {
      return -1 !== o.indexOf('micromessenger')
    },
    get isInApp() {
      return /(^|;\s)app\//.test(o)
    },
    get isInIOS() {
      return o.match(/(iphone|ipod|ipad);?/i)
    },
    get isInAndroid() {
      return o.match(/android|adr/i)
    },
    get isInPc() {
      return !(
        this.isInAndroid ||
        this.isInApp ||
        this.isInIOS ||
        this.isInWeixin
      )
    },
    get platform() {
      return this.isInPc ? 'PC' : 'Mobile'
    }
  }.isInIOS, a('querySelector'), a('querySelectorAll'))
  class m extends e {
    constructor(e, t, r, i = {}, n = {}, s) {
      super(), (this.player = e), (this.container = t), (this.el = c(
        r,
        i,
        n,
        s
      )), t && t.appendChild(this.el)
    }
    init() {}
    initEvent() {}
    initPCEvent() {}
    initMobileEvent() {}
    initTemplate() {}
    initPCTemplate() {}
    initMobileTemplate() {}
    initComponent() {}
    resetEvent() {}
    dispose() {}
  }
  function p(e, t) {
    return e && e.length
      ? function(r) {
          return e
            .map(function(e) {
              return e[t]
            })
            .filter(Boolean)
            .reduce(function(e, t) {
              return t(e)
            }, r)
        }
      : function(e) {
          return e
        }
  }
  const g = new class {
    constructor() {
      ;(this.info = console.log), (this.warn =
        console.warn), (this.error = console.error), (this.debug =
        console.log)
    }
  }()
  class v {
    constructor(e) {
      this.player = e
      let t = 'WebKitMediaSource' in window
      'MediaSource' in window
        ? (this.mediaSource = new MediaSource())
        : t && (this.mediaSource = new WebKitMediaSource())
    }
    attachMediaSource(e) {
      let t = window.URL.createObjectURL(this.mediaSource)
      return (e.src = t), t
    }
    detachMediaSource(e) {
      e.removeAttribute('src')
    }
    setDuration(e) {
      this.mediaSource &&
        'open' === this.mediaSource.readyState &&
        (null === e ||
          isNaN(e) ||
          (this.mediaSource.duration !== e &&
            (v.isBufferUpdating(this.mediaSource)
              ? setTimeout(this.setDuration.bind(this, e), 50)
              : (this.mediaSource.duration = e))))
    }
    setSeekable(e, t) {
      this.mediaSource &&
        'function' == typeof this.mediaSource.setLiveSeekableRange &&
        'function' ==
          typeof this.mediaSource.clearLiveSeekableRange &&
        'open' === this.mediaSource.readyState &&
        e >= 0 &&
        e < t &&
        (
          this.mediaSource.clearLiveSeekableRange(),
          this.mediaSource.setLiveSeekableRange(e, t)
        )
    }
    get state() {
      return this.mediaSource.readyState
    }
    get duration() {
      return this.mediaSource.duration
    }
    set duration(e) {
      this.mediaSource.duration = e
    }
    static signalEndOfStream(e) {
      if (!e || 'open' !== e.readyState) return
      let t = e.sourceBuffers
      for (let e = 0; e < t.length; e++) {
        if (t[e].updating) return
        if (0 === t[e].buffered.length) return
      }
      e.endOfStream()
    }
    static isBufferUpdating(e) {
      let t = e.sourceBuffers
      for (let e = 0; e < t.length; e++) if (t[e].updating) return !0
      return !1
    }
  }
  class S {
    constructor(e, t, r) {
      ;(this.mediaSource = e), (this.config = t), (this.player = r), (this.sourceBuffer = null), (this.initLoaded = !1), (this.queue = []), (this.updating = !1)
      const i = `${this.config.type}; codecs="${this.config.codecs}"`
      this.player.logger.info(
        `addSourceBuffer: ${i}`
      ), (this.sourceBuffer = this.mediaSource.addSourceBuffer(
        i
      )), this.init()
    }
    init() {
      this.mediaSource.addEventListener('sourceopen', () => {
        this.sourceBuffer &&
          this.sourceBuffer.addEventListener(
            'updateend',
            () => {
              ;(this.updating = !1), this.queue.length > 0 &&
                this.appendBuffer(this.queue.shift())
            },
            { once: !0 }
          )
      })
    }
    appendBuffer(e) {
      const t = this
      t.sourceBuffer &&
        (
          t.queue.push(e),
          (function e() {
            var r
            'open' === t.mediaSource.readyState
              ? 0 !== t.queue.length &&
                (t.updating
                  ? setTimeout(() => {
                      e()
                    }, 10)
                  : (
                      (t.updating = !0),
                      null === (r = t.sourceBuffer) ||
                        void 0 === r ||
                        r.addEventListener(
                          'updateend',
                          () => {
                            ;(t.updating = !1), t.queue.length > 0 &&
                              setTimeout(() => {
                                e()
                              }, 10)
                          },
                          { once: !0 }
                        ),
                      t.sourceBuffer.appendBuffer(t.queue.shift())
                    ))
              : t.player.logger.warn(
                  'mediaSource.readyState is not open'
                )
          })()
        )
    }
    endOfStream() {
      if (this.sourceBuffer)
        try {
          this.sourceBuffer.addEventListener(
            'updateend',
            () => {
              this.mediaSource.endOfStream()
            },
            { once: !0 }
          ), this.updating || this.mediaSource.endOfStream()
        } catch (e) {
          console.warn('endOfStream error', e)
        }
    }
    remove(e, t) {
      if (this.sourceBuffer)
        try {
          this.sourceBuffer.remove(e, t)
        } catch (e) {
          console.warn('remove error', e)
        }
    }
    dispose() {
      if (
        ((this.queue = []), (this.updating = !1), this.sourceBuffer)
      ) {
        try {
          this.sourceBuffer.abort()
        } catch (e) {
          console.warn('abort error', e)
        }
        this.sourceBuffer.removeEventListener(
          'updateend',
          () => {}
        ), this.mediaSource.removeSourceBuffer(
          this.sourceBuffer
        ), (this.sourceBuffer = null)
      }
      this.mediaSource.removeEventListener('sourceopen', () => {})
    }
  }
  class y {
    constructor(e, t) {
      ;(this.player = t), (this.concurrency = e), (this.queue = []), (this.activeCount = 0)
    }
    processQueue() {
      return (e = this), (t = void 0), (i = function*() {
        for (
          console.warn('start', this.activeCount);
          this.activeCount < this.concurrency &&
          this.queue.length > 0;

        ) {
          const e = this.queue.shift()
          this.activeCount++, e().finally(() => {
            this.activeCount--, this.processQueue()
          })
        }
        console.warn('end', this.activeCount)
      }), new ((r = void 0) || (r = Promise))(function(n, s) {
        function o(e) {
          try {
            l(i.next(e))
          } catch (e) {
            s(e)
          }
        }
        function u(e) {
          try {
            l(i.throw(e))
          } catch (e) {
            s(e)
          }
        }
        function l(e) {
          var t
          e.done
            ? n(e.value)
            : (
                (t = e.value),
                t instanceof r
                  ? t
                  : new r(function(e) {
                      e(t)
                    })
              ).then(o, u)
        }
        l((i = i.apply(e, t || [])).next())
      })
      var e, t, r, i
    }
    request(e = {}, t) {
      var r
      console.warn(
        'request',
        this.activeCount,
        this.concurrency,
        this.queue
      )
      const {
        url: i,
        type: n = 'json',
        method: s = 'GET',
        data: o,
        query: u
      } = e
      let l =
          null !== (r = null == e ? void 0 : e.retry) && void 0 !== r
            ? r
            : 0,
        a = i
      u && (a += d(u))
      let c = new XMLHttpRequest(),
        h = !1
      const f = new Promise((r, i) => {
        ;(c.responseType = n), (c.onload = () => {
          if (
            (
              console.warn('onload', c),
              200 === (null == c ? void 0 : c.status)
            )
          ) {
            const e = c.response
            t && t(null, e), r(e)
          } else {
            const e = new Error(
              `Request failed with status ${null == c
                ? void 0
                : c.status}`
            )
            t && t(e), i(e)
          }
        }), (c.onerror = () => {
          if (!h && l > 0)
            setTimeout(() => {
              ;(h = !0), null == c || c.abort(), l--, this.request(
                Object.assign(Object.assign({}, e), { retry: l }),
                t
              )
            }, 1e3)
          else {
            const e = new Error('Network error')
            t && t(e), i(e)
          }
        })
      })
      return this.queue.push(
        () =>
          new Promise((e, t) => {
            c.open(s.toUpperCase(), a), o && c.send(d(o))
          })
      ), this.processQueue(), {
        promise: f,
        abort: () => {
          4 !== (null == c ? void 0 : c.readyState) &&
            ((h = !0), null == c || c.abort())
        }
      }
    }
  }
  class b {
    constructor(e, t, r) {
      ;(this.video = e), (this.audio = t), (this.duration = r)
    }
    static fromManifestModel(e) {
      function t(t) {
        const { codecs: i } = e.streams[t],
          n = [t].map(r)
        return { type: t, codecs: i, playlists: n }
      }
      function r(t) {
        const r = e.streams[t],
          i = r.timelines
        function n(t, i, n) {
          const s = t
            .replace('$Number%05d$', n.toString().padStart(5, '0'))
            .replace('$RepresentationID$', r.qualities[0].id)
          return {
            uri: s,
            duration: i.lengthSeconds,
            resolvedUri: e.baseUrl + s,
            number: n,
            presentationTime: i.startSeconds
          }
        }
        return {
          timeline: i,
          initSegment: n(r.initUrlFormat, i[0], -1),
          segments: r.timelines.map((e, t) =>
            n(r.fragUrlFormat, e, t + 1)
          )
        }
      }
      const i = t('video'),
        n = t('audio'),
        s = e.mediaDuration
      return new b(i, n, s)
    }
  }
  class w extends y {
    loadSegment(e) {
      return g.info(
        `fetching ${-1 === e.number
          ? 'init'
          : e.number} segment ${e.resolvedUri}`
      ), f({ url: e.resolvedUri }).then(e => e.response)
    }
  }
  class E {
    constructor(e, t) {
      var r
      ;(this.bufferController = {
        video: null,
        audio: null
      }), (this.requestController = {
        video: null,
        audio: null
      }), (this.mediaSourceController = new v(
        e
      )), (this.requestController.video = new w(
        2,
        e
      )), (this.requestController.audio = new w(
        2,
        e
      )), (this.player = e), this.mediaSourceController.attachMediaSource(
        this.player.video
      ), (this.mediaModel = t), this.mediaSourceController.setDuration(
        this.mediaModel.duration
      ), null === (r = this.mediaSourceController.mediaSource) ||
        void 0 === r ||
        r.addEventListener('sourceopen', () => {
          this.player.logger.info(
            'video sourceopen'
          ), this.mediaSourceController.setDuration(
            this.mediaModel.duration
          ), this.load()
        })
    }
    load() {
      this.player.logger.info(
        'load media'
      ), (this.bufferController.video = new S(
        this.mediaSourceController.mediaSource,
        { type: 'video/mp4', codecs: this.mediaModel.video.codecs },
        this.player
      )), (this.bufferController.audio = new S(
        this.mediaSourceController.mediaSource,
        { type: 'audio/mp4', codecs: this.mediaModel.audio.codecs },
        this.player
      ))
      const e = e => {
        const t = this.requestController[e],
          r = this.bufferController[e],
          i = this.mediaModel[e]
        return () => {
          var n, s
          if (
            (
              this.player.logger.info(`load ${e} track: ${e}`),
              0 === i.playlists.length
            )
          )
            return
          const o =
            null === (n = i.playlists) || void 0 === n ? void 0 : n[0]
          ;(null == r ? void 0 : r.initLoaded) ||
            t
              .loadSegment(null == o ? void 0 : o.initSegment)
              .then(t => {
                var i
                this.player.logger.info(
                  `loaded ${e} init segment: ${null ===
                    (i = null == o ? void 0 : o.initSegment) ||
                  void 0 === i
                    ? void 0
                    : i.uri}`
                ), t && (null == r || r.appendBuffer(t))
              })
              .catch(e => this.player.logger.error(e)), null ===
            (s = null == o ? void 0 : o.segments) ||
            void 0 === s ||
            s.forEach(i => {
              t
                .loadSegment(i)
                .then(t => {
                  this.player.logger.info(
                    `loaded ${e} segment: ${i.uri}`
                  ), t && (null == r || r.appendBuffer(t))
                })
                .catch(e => this.player.logger.error(e))
            })
        }
      }
      setTimeout(() => {
        e('video')(), e('audio')()
      }, 10)
    }
  }
  new class extends m {
    constructor(e) {
      var t
      super(void 0, e.container, 'div', {
        class: 'dash-vdk-player'
      }), (this.id = 'Player')
      const r = p(
        null !== (t = e.addons) && void 0 !== t ? t : [],
        'onInjectConfig'
      )
      ;(this.config = r(
        e,
        this
      )), (this.player = this), (this.logger = g), this.init()
    }
    init() {
      this.config.video
        ? (
            (this.video = this.config.video),
            this.video.parentNode &&
              this.video.parentNode.removeChild(this.video)
          )
        : (
            (this.video = c('video')),
            (this.video.playsInline = !0),
            (this.video['x5-video-player-type'] = 'h5')
          ), (this.video.crossOrigin =
        'anonymous'), this.el.appendChild(
        this.video
      ), this.fetchMpd().then(e => {
        const t = this.parseMpd(e)
        this.logger.info('parse mpd manifest', t)
        const r = b.fromManifestModel(t)
        this.mediaEngine = new E(this, r)
      })
    }
    fetchMpd() {
      const { url: e } = this.config
      if (!e) throw new Error('url is required')
      return (function(e) {
        return f({ url: e, type: 'text' }).then(e => e.response)
      })(e)
    }
    parseMpd(e) {
      var t, r, i
      const n = p(
          null !== (t = this.config.addons) && void 0 !== t ? t : [],
          'onInjectBeforeParsing'
        )(e),
        s =
          null !== (r = this.config.baseUrlOverride) && void 0 !== r
            ? r
            : h(this.config.url)
      return (null !== (i = this._parser) && void 0 !== i
        ? i
        : (this._parser = new class {
            constructor(e) {
              this.baseUrlOverride = e
            }
            parse(e) {
              let t,
                r = new DOMParser().parseFromString(e, 'text/xml'),
                i = { baseUrl: '', mediaDuration: -1, streams: {} }
              var n, s, o
              ;(i.baseUrl =
                this.baseUrlOverride ||
                (function(e, t, r) {
                  var i = e.getElementsByTagName('BaseURL')[0],
                    n = i ? i.childNodes[0] : null
                  return n ? n.nodeValue : ''
                })(r)), (i.mediaDuration = (
                (n = 0),
                (o = (s = r.documentElement
                  .getAttribute('mediaPresentationDuration')
                  .substring(2)).indexOf('H')) > -1 &&
                  (
                    (n += 60 * Number(s.substring(0, o)) * 60),
                    (s = s.substring(o + 1))
                  ),
                (o = s.indexOf('M')) > -1 &&
                  (
                    (n += 60 * Number(s.substring(0, o))),
                    (s = s.substring(o + 1))
                  ),
                (o = s.indexOf('S')) > -1 &&
                  (n += Number(s.substring(0, o))),
                n
              )), (i.streams = {})
              let u = r.querySelectorAll('AdaptationSet')
              for (let e = 0; e < u.length; e++) {
                let r = u[e]
                if (r) {
                  let e = r.getAttribute('contentType'),
                    n = r.querySelectorAll('Representation'),
                    s = r.querySelector('SegmentTemplate'),
                    o = r.querySelectorAll('S'),
                    u = (i.streams[e] = {
                      streamType: e,
                      mimeType:
                        r.getAttribute('mimeType') ||
                        n[0].getAttribute('mimeType') ||
                        '',
                      codecs:
                        r.getAttribute('codecs') ||
                        n[0].getAttribute('codecs') ||
                        '',
                      initUrlFormat:
                        s.getAttribute('initialization') || '',
                      fragUrlFormat: s.getAttribute('media') || '',
                      qualities: [],
                      timelines: []
                    }),
                    l = Number(s.getAttribute('timescale'))
                  if (!o || !o.length) throw 'Missing timeline'
                  for (let e = 0; e < n.length; e++) {
                    let t = n[e],
                      r = {
                        id: t.getAttribute('id'),
                        bandwidth: t.getAttribute('bandwidth'),
                        width: 0,
                        height: 0
                      }
                    t.getAttribute('height') &&
                      (
                        (r.width = Number(t.getAttribute('width'))),
                        (r.height = Number(t.getAttribute('height')))
                      ), u.qualities.push(r)
                  }
                  let a = 0
                  for (let e = 0; e < o.length; e++) {
                    let r = o[e],
                      i = Number(r.getAttribute('r')) || 0,
                      n = Number(r.getAttribute('d'))
                    for (t = 0; t <= i; t++)
                      u.timelines.push({
                        start: a,
                        startSeconds: a / l,
                        length: n,
                        lengthSeconds: n / l
                      }), (a += n)
                  }
                }
              }
              return i
            }
          }(s))).parse(n)
    }
    play() {
      this.emit('play'), this.video.play()
    }
    pause() {
      this.emit('pause')
    }
    use(e) {
      e.install(this)
    }
  }({
    container: document.getElementById('player'),
    video: document.getElementById('video'),
    url:
      'https://jvp-1304649924.cos.ap-nanjing.myqcloud.com/mpd/input/input.mpd'
  })
})()
