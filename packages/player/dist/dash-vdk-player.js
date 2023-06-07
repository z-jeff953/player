;(() => {
  'use strict'
  const e = {
      prefixed: !0,
      requestFullscreen: void 0,
      exitFullscreen: void 0,
      fullscreenElement: void 0,
      fullscreenEnabled: void 0,
      fullscreenchange: void 0,
      fullscreenerror: void 0,
      fullscreen: void 0
    },
    n = [
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
    r = n[0]
  let l
  for (let e = 0; e < n.length; e++)
    if (n[e][1] in document) {
      l = n[e]
      break
    }
  if (l) {
    for (let n = 0; n < l.length; n++) e[r[n]] = l[n]
    e.prefixed = l[0] !== r[0]
  }
  Object.prototype.toString
  const t = window.navigator.userAgent.toLowerCase()
  function s(e) {
    return 'string' == typeof e && Boolean(e.trim())
  }
  function o(e) {
    return function(n, r) {
      if (!s(n)) return document[e](null)
      s(r) && (r = document.querySelector(r))
      const l =
        (function(e) {
          return !!e && 'object' == typeof e
        })((t = r)) && 1 === t.nodeType
          ? r
          : document
      var t
      return l[e] && l[e](n)
    }
  }
  ;({
    get isInWeixin() {
      return -1 !== t.indexOf('micromessenger')
    },
    get isInApp() {
      return /(^|;\s)app\//.test(t)
    },
    get isInIOS() {
      return t.match(/(iphone|ipod|ipad);?/i)
    },
    get isInAndroid() {
      return t.match(/android|adr/i)
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
  }.isInIOS, o('querySelector'), o('querySelectorAll'), new class {
    constructor() {
      ;(this.info = console.log), (this.warn =
        console.warn), (this.error = console.error), (this.debug =
        console.log)
    }
  }())
})()
