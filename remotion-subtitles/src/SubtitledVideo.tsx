import React from 'react';
import {AbsoluteFill, OffthreadVideo} from 'remotion';
import {Subtitles} from './Subtitles';
import captions from './captions.json';

export const SubtitledVideo: React.FC<{videoSrc: string}> = ({videoSrc}) => {
	return (
		<AbsoluteFill style={{backgroundColor: 'black'}}>
			<OffthreadVideo src={videoSrc} />
			<Subtitles captions={captions} />
		</AbsoluteFill>
	);
};
