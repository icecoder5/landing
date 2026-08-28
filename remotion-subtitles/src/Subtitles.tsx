import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';

export type Word = {
	word: string;
	start: number; // seconds
	end: number; // seconds
};

export type CaptionLine = {
	start: number;
	end: number;
	words: Word[];
};

const ACTIVE_COLOR = '#FFD400';
const IDLE_COLOR = '#FFFFFF';

export const Subtitles: React.FC<{captions: CaptionLine[]}> = ({captions}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;

	const activeLine = captions.find((c) => t >= c.start && t < c.end);

	if (!activeLine) {
		return null;
	}

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'flex-end',
				alignItems: 'center',
				paddingBottom: 140,
			}}
		>
			<div
				style={{
					fontFamily: '"Arial Black", Arial, sans-serif',
					fontSize: 64,
					fontWeight: 900,
					textTransform: 'uppercase',
					textAlign: 'center',
					maxWidth: '88%',
					lineHeight: 1.25,
					WebkitTextStroke: '3px black',
					paintOrder: 'stroke fill',
				}}
			>
				{activeLine.words.map((w, i) => {
					const isActive = t >= w.start && t < w.end;
					return (
						<span
							key={i}
							style={{
								color: isActive ? ACTIVE_COLOR : IDLE_COLOR,
								display: 'inline-block',
								marginRight: 14,
								transform: isActive ? 'scale(1.12)' : 'scale(1)',
								transition: 'transform 60ms linear',
							}}
						>
							{w.word}
						</span>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};
