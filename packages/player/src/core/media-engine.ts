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

  constructor(player: Player) {
    this.mediaSourceController = new MediaSourceController(player);
    this.requestController.video = new LoaderController(2, player);
    this.requestController.audio = new LoaderController(2, player);
    this.player = player;

    this.mediaSourceController.attachMediaSource(this.player.video);

    this.mediaSourceController.mediaSource.addEventListener('sourceopen', () => {
      this.load()
    });

  }

  public setMediaModel(mediaModel: MediaModel) {
    this.mediaModel = mediaModel;
    this.bufferController.video = new BufferController(this.mediaSourceController.mediaSource, {
      type: 'video/mp4',
      codecs: mediaModel.video.codecs
    }, this.player);
    this.bufferController.audio = new BufferController(this.mediaSourceController.mediaSource, {
      type: 'audio/mp4',
      codecs: mediaModel.audio.codecs
    }, this.player);



    console.log(this.bufferController.video?.sourceBuffer?.mode)
    console.log(this.bufferController.audio?.sourceBuffer?.mode)
  }

  public load() {
    this.player.logger.info("load media");

    const getTrackLoader = (track: TrackTypes) => {

      const requestController = this.requestController[track]!;
      const bufferController = this.bufferController[track]!;
      const mediaModel = this.mediaModel[track]!;

      return () => {
        this.player.logger.info(`load ${track} track: ${track}`);
        if (mediaModel.playlists.length === 0) return
        const playList = mediaModel.playlists?.[0];

        if (!bufferController?.initLoaded) {
          requestController.loadInitSegment(playList?.segments[0].map).then((buffer) => {
            this.player.logger.info(`loaded ${track} init segment: ${playList?.segments[0].map.uri}`);
            buffer && bufferController?.sourceBuffer?.appendBuffer(buffer)
            // buffer && bufferController?.appendBuffer(buffer)
          }).catch((err) => this.player.logger.error(err));
        }

        playList?.segments?.forEach((segment) => {
          requestController.loadSegment(segment).then((buffer) => {
            this.player.logger.info(`loaded ${track} segment: ${segment.uri}`);
            buffer && bufferController?.sourceBuffer?.appendBuffer(buffer)
            // buffer && bufferController?.appendBuffer(buffer)
          }).catch((err) => this.player.logger.error(err));
        });
      }
    }
    getTrackLoader('video')();
    getTrackLoader('audio')();
  }
}