import { BufferController, MediaSourceController, LoaderController } from '../controller';
import { MediaModel, Playlist, TrackTypes } from '../model/media';
import { Player } from './player';

export class MediaEngine {
  mediaSourceController: MediaSourceController;
  bufferController: {
    video: BufferController | null
    audio: BufferController | null
  } = { video: null, audio: null };
  requestController: {
    video: LoaderController | null
    audio: LoaderController | null
  } = { video: null, audio: null };
  player: Player;
  mediaModel: MediaModel;

  constructor(player: Player, mediaModel: MediaModel) {
    this.mediaSourceController = new MediaSourceController(player);
    this.requestController.video = new LoaderController(2, player);
    this.requestController.audio = new LoaderController(2, player);
    this.player = player;

    this.mediaSourceController.attachMediaSource(this.player.video);

    this.mediaModel = mediaModel;

    this.mediaSourceController.setDuration(this.mediaModel.duration);

    this.mediaSourceController.mediaSource?.addEventListener("sourceopen", () => {
      this.player.logger.info("video sourceopen");

      this.mediaSourceController.setDuration(this.mediaModel.duration);

      this.load()
    });
  }

  public load() {
    this.player.logger.info("load media");


    this.bufferController.video = new BufferController(this.mediaSourceController.mediaSource, {
      type: 'video/mp4',
      codecs: this.mediaModel.video.codecs
    }, this.player);
    this.bufferController.audio = new BufferController(this.mediaSourceController.mediaSource, {
      type: 'audio/mp4',
      codecs: this.mediaModel.audio.codecs
    }, this.player);

    const getInitTrack = (track: TrackTypes) => {

      const requestController = this.requestController[track]!;
      const bufferController = this.bufferController[track]!;
      const mediaModel = this.mediaModel[track]!;

      return () => {
        this.player.logger.info(`load ${track} track: ${track}`);
        if (mediaModel.playlists.length === 0) return
        const playList = mediaModel.playlists?.[0];

        if (!bufferController?.initLoaded) {
          requestController.loadSegment(playList?.initSegment).then((buffer) => {
            this.player.logger.info(`loaded ${track} init segment: ${playList?.initSegment?.uri}`);
            buffer && bufferController?.appendBuffer(buffer)
          }).catch((err) => this.player.logger.error(err));
        }

        playList?.segments?.forEach((segment) => {
          requestController.loadSegment(segment).then((buffer) => {
            this.player.logger.info(`loaded ${track} segment: ${segment.uri}`);
            // buffer && bufferController?.sourceBuffer?.appendBuffer(buffer)
            buffer && bufferController?.appendBuffer(buffer)
          }).catch((err) => this.player.logger.error(err));
        });
      }
    }
    setTimeout(() => {
      getInitTrack('video')();
      getInitTrack('audio')();
    }, 10);
  }
}