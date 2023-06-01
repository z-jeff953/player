import { PlayerOriginEvents } from '../constant/event'
import { Component } from "./component";
import { useMiddleware } from "./addons";
import { Logger, logger } from "./logger";
import { createEl, fetchBuffer, fetchXml } from "../util";
import { MediaEngine } from "./media-engine"
import parser from "@dash-vdk/dash"
import { MediaModel } from '../model/media';

export interface PlayerConfig {
  url?: string;
  container?: HTMLElement;
  video?: HTMLVideoElement;
  post?: string;
  autoPlay?: boolean;
  streamPlay?: boolean;
  title?:
  | string
  | {
    message: string;
    style?: Partial<CSSStyleDeclaration>;
  };
  addons?: PlayerAddon[];
  showDefaultControl?: boolean;
};

export interface PlayerMiddleware<T> {
  (next: T, player?: Player): T;
}

interface PlayerControl<T extends Player> {
  name: string;
  position: "right" | "left";
}

export interface PlayerAddon<P extends Player = any> {
  getInfo?: PlayerMiddleware<{
    name: string;
  }>;
  onInjectControls?: PlayerMiddleware<PlayerControl<P>>;
  onInjectConfig?: PlayerMiddleware<PlayerConfig>;
  onInjectBeforeParsing?: PlayerMiddleware<any>;
}



export interface Plugin {
  install: (player: Player) => any;
};

export class Player extends Component<PlayerOriginEvents> {
  id: string = "Player";
  video: HTMLVideoElement;
  config: PlayerConfig;
  mediaEngine: MediaEngine;
  logger: Logger;
  constructor(config: PlayerConfig) {
    super(void 0, config.container, 'div', { class: 'dash-vdk-player' });
    const middleware = useMiddleware(config.addons ?? [], 'onInjectConfig') as unknown as PlayerMiddleware<PlayerConfig>
    this.config = middleware(config, this);
    this.player = this;
    this.logger = logger;
    this.init();
  }

  init() {
    /// 初始化video element
    if (this.config.video) {
      this.video = this.config.video;
      this.video.parentNode && this.video.parentNode.removeChild(this.video);
    } else {
      // 兼容移动端设置的属性
      this.video = createEl("video");
      this.video.playsInline = true;
      // @ts-ignore
      this.video["x5-video-player-type"] = "h5";
    }
    this.video.crossOrigin = "anonymous";

    this.el.appendChild(this.video);


    this.fetchMpd().then((xml) => {
      const mpd = this.parseMpd(xml) as any;

      this.logger.info("parse mpd", mpd);

      const mediaModel: MediaModel = {
        video: {
          type: "video",
          codecs: mpd.playlists[0].attributes.CODECS.split(','),
          playlists: mpd.playlists,
        },
        audio: {
          type: "audio",
          codecs: mpd.mediaGroups.AUDIO.audio.und.playlists[0].attributes.CODECS.split(','),
          playlists: mpd.mediaGroups.AUDIO.audio.und.playlists,
        },
        duration: mpd.duration
      }
      this.mediaEngine = new MediaEngine(this, mediaModel);

    });
  }

  fetchMpd() {
    const { url } = this.config;
    if (!url) {
      throw new Error("url is required");
    }
    return fetchXml(url);
  }


  parseMpd(xmlString: string) {
    const middleware = useMiddleware(this.config.addons ?? [], 'onInjectBeforeParsing') as unknown as PlayerMiddleware<any>
    const xml = middleware(xmlString);
    return parser.parse(xml, { manifestUri: "https://jvp-1304649924.cos.ap-nanjing.myqcloud.com/mpd/input/input.mpd" });
  }

  play() {
    this.emit('play')
    this.video.play();
  }

  pause() {
    this.emit('pause')
  }

  use(plugin: Plugin) {
    plugin.install(this);
  }

}
