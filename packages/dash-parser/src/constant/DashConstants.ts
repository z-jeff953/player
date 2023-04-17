// const DashConstants = {
//   BASE_URL: 'BaseURL',
//   SEGMENT_BASE: 'SegmentBase',
//   SEGMENT_TEMPLATE: 'SegmentTemplate',
//   SEGMENT_LIST: 'SegmentList',
//   SEGMENT_URL: 'SegmentURL',
//   SEGMENT_TIMELINE: 'SegmentTimeline',
//   SEGMENT_PROFILES: 'segmentProfiles',
//   ADAPTATION_SET: 'AdaptationSet',
//   REPRESENTATION: 'Representation',
//   REPRESENTATION_INDEX: 'RepresentationIndex',
//   SUB_REPRESENTATION: 'SubRepresentation',
//   INITIALIZATION: 'Initialization',
//   INITIALIZATION_MINUS: 'initialization',
//   MPD: 'MPD',
//   PERIOD: 'Period',
//   ASSET_IDENTIFIER: 'AssetIdentifier',
//   EVENT_STREAM: 'EventStream',
//   ID: 'id',
//   PROFILES: 'profiles',
//   SERVICE_LOCATION: 'serviceLocation',
//   RANGE: 'range',
//   INDEX: 'index',
//   MEDIA: 'media',
//   BYTE_RANGE: 'byteRange',
//   INDEX_RANGE: 'indexRange',
//   MEDIA_RANGE: 'mediaRange',
//   VALUE: 'value',
//   CONTENT_TYPE: 'contentType',
//   MIME_TYPE: 'mimeType',
//   BITSTREAM_SWITCHING: 'BitstreamSwitching',
//   BITSTREAM_SWITCHING_MINUS: 'bitstreamSwitching',
//   CODECS: 'codecs',
//   DEPENDENCY_ID: 'dependencyId',
//   MEDIA_STREAM_STRUCTURE_ID: 'mediaStreamStructureId',
//   METRICS: 'Metrics',
//   METRICS_MINUS: 'metrics',
//   REPORTING: 'Reporting',
//   WIDTH: 'width',
//   HEIGHT: 'height',
//   SAR: 'sar',
//   FRAMERATE: 'frameRate',
//   AUDIO_SAMPLING_RATE: 'audioSamplingRate',
//   MAXIMUM_SAP_PERIOD: 'maximumSAPPeriod',
//   START_WITH_SAP: 'startWithSAP',
//   MAX_PLAYOUT_RATE: 'maxPlayoutRate',
//   CODING_DEPENDENCY: 'codingDependency',
//   SCAN_TYPE: 'scanType',
//   FRAME_PACKING: 'FramePacking',
//   AUDIO_CHANNEL_CONFIGURATION: 'AudioChannelConfiguration',
//   CONTENT_PROTECTION: 'ContentProtection',
//   ESSENTIAL_PROPERTY: 'EssentialProperty',
//   SUPPLEMENTAL_PROPERTY: 'SupplementalProperty',
//   INBAND_EVENT_STREAM: 'InbandEventStream',
//   PRODUCER_REFERENCE_TIME: 'ProducerReferenceTime',
//   INBAND: 'inband',
//   TYPE: 'type',
//   ACCESSIBILITY: 'Accessibility',
//   ROLE: 'Role',
//   RATING: 'Rating',
//   CONTENT_COMPONENT: 'ContentComponent',
//   SUBSET: 'Subset',
//   LANG: 'lang',
//   VIEWPOINT: 'Viewpoint',
//   ROLE_ASARRAY: 'Role_asArray',
//   REPRESENTATION_ASARRAY: 'Representation_asArray',
//   PRODUCERREFERENCETIME_ASARRAY: 'ProducerReferenceTime_asArray',
//   ACCESSIBILITY_ASARRAY: 'Accessibility_asArray',
//   AUDIOCHANNELCONFIGURATION_ASARRAY:
//     'AudioChannelConfiguration_asArray',
//   CONTENTPROTECTION_ASARRAY: 'ContentProtection_asArray',
//   MAIN: 'main',
//   DYNAMIC: 'dynamic',
//   STATIC: 'static',
//   MEDIA_PRESENTATION_DURATION: 'mediaPresentationDuration',
//   MINIMUM_UPDATE_PERIOD: 'minimumUpdatePeriod',
//   CODEC_PRIVATE_DATA: 'codecPrivateData',
//   BANDWITH: 'bandwidth',
//   SOURCE_URL: 'sourceURL',
//   TIMESCALE: 'timescale',
//   DURATION: 'duration',
//   START_NUMBER: 'startNumber',
//   PRESENTATION_TIME_OFFSET: 'presentationTimeOffset',
//   AVAILABILITY_START_TIME: 'availabilityStartTime',
//   AVAILABILITY_END_TIME: 'availabilityEndTime',
//   TIMESHIFT_BUFFER_DEPTH: 'timeShiftBufferDepth',
//   MAX_SEGMENT_DURATION: 'maxSegmentDuration',
//   PRESENTATION_TIME: 'presentationTime',
//   MIN_BUFFER_TIME: 'minBufferTime',
//   MAX_SUBSEGMENT_DURATION: 'maxSubsegmentDuration',
//   START: 'start',
//   AVAILABILITY_TIME_OFFSET: 'availabilityTimeOffset',
//   AVAILABILITY_TIME_COMPLETE: 'availabilityTimeComplete',
//   CENC_DEFAULT_KID: 'cenc:default_KID',
//   DVB_PRIORITY: 'dvb:priority',
//   DVB_WEIGHT: 'dvb:weight',
//   SUGGESTED_PRESENTATION_DELAY: 'suggestedPresentationDelay',
//   SERVICE_DESCRIPTION: 'ServiceDescription',
//   SERVICE_DESCRIPTION_SCOPE: 'Scope',
//   SERVICE_DESCRIPTION_LATENCY: 'Latency',
//   SERVICE_DESCRIPTION_PLAYBACK_RATE: 'PlaybackRate',
//   SERVICE_DESCRIPTION_OPERATING_QUALITY: 'OperatingQuality',
//   SERVICE_DESCRIPTION_OPERATING_BANDWIDTH: 'OperatingBandwidth',
//   PATCH_LOCATION: 'PatchLocation',
//   PUBLISH_TIME: 'publishTime',
//   ORIGINAL_PUBLISH_TIME: 'originalPublishTime',
//   ORIGINAL_MPD_ID: 'mpdId',
//   WALL_CLOCK_TIME: 'wallClockTime',
//   LABEL: 'Label',
//   GROUP_LABEL: 'GroupLabel',
//   CONTENT_STEERING: 'ContentSteering',
//   CONTENT_STEERING_AS_ARRAY: 'ContentSteering_asArray',
//   DEFAULT_SERVICE_LOCATION: 'defaultServiceLocation',
//   QUERY_BEFORE_START: 'queryBeforeStart',
//   PROXY_SERVER_URL: 'proxyServerURL',
//   CONTENT_STEERING_RESPONSE: {
//     VERSION: 'VERSION',
//     TTL: 'TTL',
//     RELOAD_URI: 'RELOAD-URI',
//     SERVICE_LOCATION_PRIORITY: 'SERVICE-LOCATION-PRIORITY'
//   },
//   PRODUCER_REFERENCE_TIME_TYPE: {
//     ENCODER: 'encoder',
//     CAPTURED: 'captured',
//     APPLICATION: 'application'
//   },
//   SEGMENT_ALIGNMENT: 'segmentAlignment',
//   SUB_SEGMENT_ALIGNMENT: 'subsegmentAlignment'
// }

// export default DashConstants

class Constants {
  // DASH MPD Elements
  readonly ACCESSIBILITY = 'Accessibility'
  readonly ADAPTATION_SET = 'AdaptationSet'
  readonly ASSET_IDENTIFIER = 'AssetIdentifier'
  readonly AUDIO_CHANNEL_CONFIGURATION = 'AudioChannelConfiguration'
  readonly BASEURL = 'BaseURL'
  readonly BITSTREAM_SWITCHING = 'BitstreamSwitching'
  readonly CONTENT_COMPONENT = 'ContentComponent'
  readonly CONTENT_POPULARITY_RATE = 'ContentPopularityRate'
  readonly CONTENT_PROTECTION = 'ContentProtection'
  readonly COPYRIGHT = 'Copyright'
  readonly EMPTY_ADAPTATION_SET = 'EmptyAdaptationSet'
  readonly ESSENTIAL_PROPERTY = 'EssentialProperty'
  readonly EVENT = 'Event'
  readonly EVENT_STREAM = 'EventStream'
  readonly FAILOVER_CONTENT = 'FailoverContent'
  readonly FCS = 'FCS'
  readonly FRAME_PACKING = 'FramePacking'
  readonly GROUP_LABEL = 'GroupLabel'
  readonly INBAND_EVENT_STREAM = 'InbandEventStream'
  readonly INITIALIZATION = 'Initialization'
  readonly INITIALIZATION_GROUP = 'InitializationGroup'
  readonly INITIALIZATION_PRESENTATION = 'InitializationPresentation'
  readonly INITIALIZATION_SET = 'InitializationSet'
  readonly LABEL = 'Label'
  readonly LATENCY = 'Latency'
  readonly LEAP_SECOND_INFORMATION = 'LeapSecondInformation'
  readonly LOCATION = 'Location'
  readonly METRICS = 'Metrics'
  readonly MPD = 'MPD'
  readonly OPERATING_BANDWIDTH = 'OperatingBandwidth'
  readonly OPERATING_QUALITY = 'OperatingQuality'
  readonly PERIOD = 'Period'
  readonly PLAYBACK_RATE = 'PlaybackRate'
  readonly PR = 'PR'
  readonly PRESELECTION = 'Preselection'
  readonly PRODUCER_REFERENCE_TIME = 'ProducerReferenceTime'
  readonly PROGRAM_INFORMATION = 'ProgramInformation'
  readonly QUALITY_LATENCY = 'QualityLatency'
  readonly RANDOM_ACCESS = 'RandomAccess'
  readonly RANGE = 'Range'
  readonly RATING = 'Rating'
  readonly REPORTING = 'Reporting'
  readonly REPRESENTATION = 'Representation'
  readonly REPRESENTATION_INDEX = 'RepresentationIndex'
  readonly ROLE = 'Role'
  readonly S = 'S'
  readonly SCOPE = 'Scope'
  readonly SEGMENT_BASE = 'SegmentBase'
  readonly SEGMENT_LIST = 'SegmentList'
  readonly SEGMENT_TEMPLATE = 'SegmentTemplate'
  readonly SEGMENT_TIMELINE = 'SegmentTimeline'
  readonly SEGMENTURL = 'SegmentURL'
  readonly SERVICE_DESCRIPTION = 'ServiceDescription'
  readonly SOURCE = 'Source'
  readonly SUB_REPRESENTATION = 'SubRepresentation'
  readonly SUBSET = 'Subset'
  readonly SUPPLEMENTAL_PROPERTY = 'SupplementalProperty'
  readonly SWITCHING = 'Switching'
  readonly TITLE = 'Title'
  readonly UTC_TIMING = 'UTCTiming'
  readonly VIEWPOINT = 'Viewpoint'

  // DASH MPD Attributes
  readonly ATTR_APPLICATION_SCHEME = 'applicationScheme'
  readonly ATTR_ASSOCIATION_ID = 'associationId'
  readonly ATTR_ASSOCIATION_TYPE = 'associationType'
  readonly ATTR_AUDIO_SAMPLING_RATE = 'audioSamplingRate'
  readonly ATTR_AVAILABILITY_END_TIME = 'availabilityEndTime'
  readonly ATTR_AVAILABILITY_START_LEAP_OFFSET = 'availabilityStartLeapOffset'
  readonly ATTR_AVAILABILITY_START_TIME = 'availabilityStartTime'
  readonly ATTR_AVAILABILITY_TIME_COMPLETE = 'availabilityTimeComplete'
  readonly ATTR_AVAILABILITY_TIME_OFFSET = 'availabilityTimeOffset'
  readonly ATTR_BANDWIDTH = 'bandwidth'
  readonly ATTR_BITSTREAM_SWITCHING = 'bitstreamSwitching'
  readonly ATTR_BYTE_RANGE = 'byteRange'
  readonly ATTR_CODECS = 'codecs'
  readonly ATTR_CODING_DEPENDENCY = 'codingDependency'
  readonly ATTR_CONTAINS = 'contains'
  readonly ATTR_CONTENT_COMPONENT = 'contentComponent'
  readonly ATTR_CONTENT_ENCODING = 'contentEncoding'
  readonly ATTR_CONTENT_TYPE = 'contentType'
  readonly ATTR_D = 'd'
  readonly ATTR_DEPENDENCY_ID = 'dependencyId'
  readonly ATTR_DEPENDENCY_LEVEL = 'dependencyLevel'
  readonly ATTR_DURATION = 'duration'
  readonly ATTR_END_NUMBER = 'endNumber'
  readonly ATTR_EPT_DELTA = 'eptDelta'
  readonly ATTR_FRAME_RATE = 'frameRate'
  readonly ATTR_GROUP = 'group'
  readonly ATTR_HEIGHT = 'height'
  readonly ATTR_ID = 'id'
  readonly ATTR_IN_ALL_PERIODS = 'inAllPeriods'
  readonly ATTR_INBAND = 'inband'
  readonly ATTR_INDEX = 'index'
  readonly ATTR_INDEX_RANGE = 'indexRange'
  readonly ATTR_INDEX_RANGE_EXACT = 'indexRangeExact'
  readonly ATTR_INITIALIZATION = 'initialization'
  readonly ATTR_INITIALIZATION_SET_REF = 'initializationSetRef'
  readonly ATTR_INTERVAL = 'interval'
  readonly ATTR_K = 'k'
  readonly ATTR_LANG = 'lang'
  readonly ATTR_LEVEL = 'level'
  readonly ATTR_MAX = 'max'
  readonly ATTR_MAX_BANDWIDTH = 'maxBandwidth'
  readonly ATTR_MAX_DIFFERENCE = 'maxDifference'
  readonly ATTR_MAX_FRAME_RATE = 'maxFrameRate'
  readonly ATTR_MAX_HEIGHT = 'maxHeight'
  readonly ATTR_MAXIMUMSAP_PERIOD = 'maximumSAPPeriod'
  readonly ATTR_MAX_PLAYOUT_RATE = 'maxPlayoutRate'
  readonly ATTR_MAX_SEGMENT_DURATION = 'maxSegmentDuration'
  readonly ATTR_MAX_SUBSEGMENT_DURATION = 'maxSubsegmentDuration'
  readonly ATTR_MAX_WIDTH = 'maxWidth'
  readonly ATTR_MEDIA = 'media'
  readonly ATTR_MEDIA_PRESENTATION_DURATION = 'mediaPresentationDuration'
  readonly ATTR_MEDIA_RANGE = 'mediaRange'
  readonly ATTR_MEDIA_STREAM_STRUCTURE_ID = 'mediaStreamStructureId'
  readonly ATTR_MEDIA_TYPE = 'mediaType'
  readonly ATTR_MESSAGE_DATA = 'messageData'
  readonly ATTR_METRICS = 'metrics'
  readonly ATTR_MIME_TYPE = 'mimeType'
  readonly ATTR_MIN = 'min'
  readonly ATTR_MIN_BANDWIDTH = 'minBandwidth'
  readonly ATTR_MIN_BUFFER_TIME = 'minBufferTime'
  readonly ATTR_MIN_FRAME_RATE = 'minFrameRate'
  readonly ATTR_MIN_HEIGHT = 'minHeight'
  readonly ATTR_MINIMUM_UPDATE_PERIOD = 'minimumUpdatePeriod'
  readonly ATTR_MIN_WIDTH = 'minWidth'
  readonly ATTR_MORE_INFORMATIONURL = 'moreInformationURL'
  readonly ATTR_N = 'n'
  readonly ATTR_NEXT_AVAILABILITY_START_LEAP_OFFSET = 'nextAvailabilityStartLeapOffset'
  readonly ATTR_NEXT_LEAP_CHANGE_TIME = 'nextLeapChangeTime'
  readonly ATTR_NULL = 'null'
  readonly ATTR_ORDER = 'order'
  readonly ATTR_PAR = 'par'
  readonly ATTR_POPULARITY_RATE = 'popularityRate'
  readonly ATTR_PRESELECTION_COMPONENTS = 'preselectionComponents'
  readonly ATTR_PRESENTATION_DURATION = 'presentationDuration'
  readonly ATTR_PRESENTATION_TIME = 'presentationTime'
  readonly ATTR_PRESENTATION_TIME_OFFSET = 'presentationTimeOffset'
  readonly ATTR_PROFILES = 'profiles'
  readonly ATTR_PUBLISH_TIME = 'publishTime'
  readonly ATTR_QUALITY_RANKING = 'qualityRanking'
  readonly ATTR_R = 'r'
  readonly ATTR_RANGE = 'range'
  readonly ATTR_REFERENCE_ID = 'referenceId'
  readonly ATTR_SAR = 'sar'
  readonly ATTR_SCAN_TYPE = 'scanType'
  readonly ATTR_SCHEME_IDURI = 'schemeIdUri'
  readonly ATTR_SEGMENT_ALIGNMENT = 'segmentAlignment'
  readonly ATTR_SEGMENT_PROFILES = 'segmentProfiles'
  readonly ATTR_SELECTION_PRIORITY = 'selectionPriority'
  readonly ATTR_SERVICE_LOCATION = 'serviceLocation'
  readonly ATTR_SOURCE = 'source'
  readonly ATTR_SOURCE_DESCRIPTION = 'source_description'
  readonly ATTR_SOURCEURL = 'sourceURL'
  readonly ATTR_START = 'start'
  readonly ATTR_START_NUMBER = 'startNumber'
  readonly ATTR_STARTTIME = 'starttime'
  readonly ATTR_START_WITHSAP = 'startWithSAP'
  readonly ATTR_SUBSEGMENT_ALIGNMENT = 'subsegmentAlignment'
  readonly ATTR_SUBSEGMENT_STARTS_WITHSAP = 'subsegmentStartsWithSAP'
  readonly ATTR_SUGGESTED_PRESENTATION_DELAY = 'suggestedPresentationDelay'
  readonly ATTR_T = 't'
  readonly ATTR_TAG = 'tag'
  readonly ATTR_TARGET = 'target'
  readonly ATTR_TIMESCALE = 'timescale'
  readonly ATTR_TIME_SHIFT_BUFFER_DEPTH = 'timeShiftBufferDepth'
  readonly ATTR_TYPE = 'type'
  readonly ATTR_VALID = 'valid'
  readonly ATTR_VALUE = 'value'
  readonly ATTR_WALL_CLOCK_TIME = 'wallClockTime'
  readonly ATTR_WIDTH = 'width'

  // DASH MPD Array Elements
  readonly ALWAYS_ARRAY_ELEMENTS = [
    /\.Accessibility$/,
    /\.AdaptationSet$/,
    /\.AudioChannelConfiguration$/,
    /\.BaseURL$/,
    /\.ContentComponent$/,
    /\.ContentPopularityRate$/,
    /\.ContentProtection$/,
    /\.EmptyAdaptationSet$/,
    /\.EssentialProperty$/,
    /\.Event$/,
    /\.EventStream$/,
    /\.FCS$/,
    /\.FramePacking$/,
    /\.GroupLabel$/,
    /\.InbandEventStream$/,
    /\.InitializationGroup$/,
    /\.InitializationPresentation$/,
    /\.InitializationSet$/,
    /\.Label$/,
    /\.Latency$/,
    /\.Location$/,
    /\.Metrics$/,
    /\.OperatingBandwidth$/,
    /\.OperatingQuality$/,
    /\.Period$/,
    /\.PlaybackRate$/,
    /\.PR$/,
    /\.Preselection$/,
    /\.ProducerReferenceTime$/,
    /\.ProgramInformation$/,
    /\.QualityLatency$/,
    /\.RandomAccess$/,
    /\.Range$/,
    /\.Rating$/,
    /\.Reporting$/,
    /\.Representation$/,
    /\.Role$/,
    /\.S$/,
    /\.Scope$/,
    /\.SegmentURL$/,
    /\.ServiceDescription$/,
    /\.SubRepresentation$/,
    /\.Subset$/,
    /\.SupplementalProperty$/,
    /\.Switching$/,
    /\.UTCTiming$/,
    /\.Viewpoint$/
  ]
}

let constants = new Constants()
export const DashConstants = constants
