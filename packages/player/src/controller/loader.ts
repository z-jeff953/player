import { Playlist, Segment, SegmentMap } from '../model/media';
import { RequestController } from './request'
import { logger } from '../core/logger';
import { fetchBuffer } from '../util';

export class LoaderController extends RequestController {

  loadSegment(segment: Segment) {
    logger.info(`fetching segment ${segment.resolvedUri}`);
    return fetchBuffer(segment.resolvedUri);
  }

  loadInitSegment(map: SegmentMap) {
    logger.info(`fetching init segment ${map.resolvedUri}`);
    return fetchBuffer(map.resolvedUri)
  }
}