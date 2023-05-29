import "./style/reset.less";
import "./style/index.less"
import { Player, PlayerAddon } from "@dash-vdk/player"

const player = new Player({
  container: document.getElementById("player") as HTMLElement,
  video: document.getElementById("video") as HTMLVideoElement,
  url: "https://jvp-1304649924.cos.ap-nanjing.myqcloud.com/mpd/input/input.mpd"
})
