import React from 'react';
import {Composition, staticFile} from 'remotion';
import {getVideoMetadata} from '@remotion/media-utils';
import {SubtitledVideo} from './SubtitledVideo';

const VIDEO_SRC = staticFile('video.mp4');
const FPS = 30;

export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="SubtitledVideo"
			component={SubtitledVideo}
			durationInFrames={30 * 10}
			fps={FPS}
			width={1080}
			height={1920}
			defaultProps={{videoSrc: VIDEO_SRC}}
			calculateMetadata={async () => {
				const {durationInSeconds} = await getVideoMetadata(VIDEO_SRC);
				return {
					durationInFrames: Math.max(1, Math.round(durationInSeconds * FPS)),
				};
			}}
		/>
	);
};
