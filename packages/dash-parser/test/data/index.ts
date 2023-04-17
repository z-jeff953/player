import { ConvertedMpd, MpdModel } from '../../src/types'

export const xmlString = `<?xml version="1.0" encoding="utf-8"?>
<MPD xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="urn:mpeg:dash:schema:mpd:2011"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	xsi:schemaLocation="urn:mpeg:DASH:schema:MPD:2011 http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd"
	profiles="urn:mpeg:dash:profile:isoff-live:2011"
	type="static"
	mediaPresentationDuration="PT42.2S"
	maxSegmentDuration="PT5.0S"
	minBufferTime="PT11.5S">
	<ProgramInformation>
	</ProgramInformation>
	<ServiceDescription id="0">
	</ServiceDescription>
	<Period id="0" start="PT0.0S">
		<AdaptationSet id="0" contentType="video" startWithSAP="1" segmentAlignment="true" bitstreamSwitching="true" frameRate="25/1" maxWidth="720" maxHeight="720" par="1:1" lang="und">
			<Representation id="0" mimeType="video/mp4" codecs="avc1.64001f" bandwidth="500000" width="720" height="720" sar="1:1">
				<SegmentTemplate timescale="12800" initialization="init-$RepresentationID$.m4s" media="chunk-$RepresentationID$-$Number%05d$.m4s" startNumber="1">
					<SegmentTimeline>
						<S t="0" d="73728" r="6" />
						<S d="24576" />
					</SegmentTimeline>
				</SegmentTemplate>
			</Representation>
		</AdaptationSet>
		<AdaptationSet id="1" contentType="audio" startWithSAP="1" segmentAlignment="true" bitstreamSwitching="true" lang="und">
			<Representation id="1" mimeType="audio/mp4" codecs="mp4a.40.2" bandwidth="128000" audioSamplingRate="22050">
				<AudioChannelConfiguration schemeIdUri="urn:mpeg:dash:23003:3:audio_channel_configuration:2011" value="2" />
				<SegmentTemplate timescale="22050" initialization="init-$RepresentationID$.m4s" media="chunk-$RepresentationID$-$Number%05d$.m4s" startNumber="1">
					<SegmentTimeline>
						<S t="0" d="109568" />
						<S d="110592" r="6" />
						<S d="46080" />
					</SegmentTimeline>
				</SegmentTemplate>
			</Representation>
		</AdaptationSet>
	</Period>
</MPD>`

export const parsedMpd: ConvertedMpd.Mpd = {
  ProgramInformation: [{ __text: '' }],
  ServiceDescription: [{ id: '0' }],
  Period: [
    {
      AdaptationSet: [
        {
          Representation: [
            {
              SegmentTemplate: {
                SegmentTimeline: {
                  S: [{ t: '0', d: '73728', r: '6' }, { d: '24576' }]
                },
                timescale: '12800',
                initialization: 'init-$RepresentationID$.m4s',
                media: 'chunk-$RepresentationID$-$Number%05d$.m4s',
                startNumber: '1'
              },
              id: '0',
              mimeType: 'video/mp4',
              codecs: 'avc1.64001f',
              bandwidth: '500000',
              width: '720',
              height: '720',
              sar: '1:1'
            }
          ],
          id: '0',
          contentType: 'video',
          startWithSAP: '1',
          segmentAlignment: 'true',
          bitstreamSwitching: 'true',
          frameRate: '25/1',
          maxWidth: '720',
          maxHeight: '720',
          par: '1:1',
          lang: 'und'
        },
        {
          Representation: [
            {
              AudioChannelConfiguration: [
                {
                  schemeIdUri:
                    'urn:mpeg:dash:23003:3:audio_channel_configuration:2011',
                  value: '2'
                }
              ],
              SegmentTemplate: {
                SegmentTimeline: {
                  S: [
                    { t: '0', d: '109568' },
                    { d: '110592', r: '6' },
                    { d: '46080' }
                  ]
                },
                timescale: '22050',
                initialization: 'init-$RepresentationID$.m4s',
                media: 'chunk-$RepresentationID$-$Number%05d$.m4s',
                startNumber: '1'
              },
              id: '1',
              mimeType: 'audio/mp4',
              codecs: 'mp4a.40.2',
              bandwidth: '128000',
              audioSamplingRate: '22050'
            }
          ],
          id: '1',
          contentType: 'audio',
          startWithSAP: '1',
          segmentAlignment: 'true',
          bitstreamSwitching: 'true',
          lang: 'und'
        }
      ],
      id: '0',
      start: 'PT0.0S'
    }
  ],
  profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
  type: 'static',
  mediaPresentationDuration: 'PT42.2S',
  maxSegmentDuration: 'PT5.0S',
  minBufferTime: 'PT11.5S'
}

export const mpdModel: MpdModel.Mpd = {
  ProgramInformation: [{ __text: '' }],
  ServiceDescription: [{ id: '0' }],
  Period: [
    {
      AdaptationSet: [
        {
          Representation: [
            {
              SegmentTemplate: {
                SegmentTimeline: {
                  S: [{ t: 0, d: 73728, r: 6 }, { d: 24576 }]
                },
                timescale: 12800,
                initialization: 'init-$RepresentationID$.m4s',
                media: 'chunk-$RepresentationID$-$Number%05d$.m4s',
                startNumber: 1
              },
              id: '0',
              mimeType: 'video/mp4',
              codecs: 'avc1.64001f',
              bandwidth: 500000,
              width: 720,
              height: 720,
              sar: '1:1'
            }
          ],
          id: '0',
          contentType: 'video',
          startWithSAP: '1',
          segmentAlignment: true,
          bitstreamSwitching: true,
          frameRate: '25/1',
          maxWidth: '720',
          maxHeight: '720',
          par: '1:1',
          lang: 'und'
        },
        {
          Representation: [
            {
              AudioChannelConfiguration: [
                {
                  schemeIdUri:
                    'urn:mpeg:dash:23003:3:audio_channel_configuration:2011',
                  value: 2
                }
              ],
              SegmentTemplate: {
                SegmentTimeline: {
                  S: [
                    { t: 0, d: 109568 },
                    { d: 110592, r: 6 },
                    { d: 46080 }
                  ]
                },
                timescale: 22050,
                initialization: 'init-$RepresentationID$.m4s',
                media: 'chunk-$RepresentationID$-$Number%05d$.m4s',
                startNumber: 1
              },
              id: '1',
              mimeType: 'audio/mp4',
              codecs: 'mp4a.40.2',
              bandwidth: 128000,
              audioSamplingRate: '22050'
            }
          ],
          id: '1',
          contentType: 'audio',
          startWithSAP: '1',
          segmentAlignment: true,
          bitstreamSwitching: true,
          lang: 'und'
        }
      ],
      id: '0',
      start: 'PT0.0S'
    }
  ],
  profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
  type: 'static',
  mediaPresentationDuration: 'PT42.2S',
  maxSegmentDuration: 'PT5.0S',
  minBufferTime: 'PT11.5S'
}
