import { Playlist, Segment, INIT_SEGMENT_INDEX } from '../model/media';
import { RequestController } from './request'
import { logger } from '../core/logger';
import { fetchBuffer } from '../util';

export class LoaderController extends RequestController {
  loadSegment(segment: Segment) {
    logger.info(`fetching ${segment.number === INIT_SEGMENT_INDEX ? "init" : segment.number} segment ${segment.resolvedUri}`);
    return fetchBuffer(segment.resolvedUri);
  }
}