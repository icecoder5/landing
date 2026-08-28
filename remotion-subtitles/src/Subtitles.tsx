import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';

export type Caption = {
	text: string;
	start: number; // seconds
	end: number; // seconds
};

export const Subtitles: React.FC<{captions: Caption[]}> = ({captions}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const timeInSeconds = frame / fps;

	const active = captions.find(
		(c) => timeInSeconds >= c.start && timeInSeconds < c.end,
	);

	if (!active) {
		return null;
	}

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'flex-end',
				alignItems: 'center',
				paddingBottom: 120,
			}}
		>
			<div
				style={{
					fontFamily: 'Arial, sans-serif',
					fontSize: 56,
					fontWeight: 700,
					color: 'white',
					textAlign: 'center',
					maxWidth: '85%',
					padding: '12px 28px',
					borderRadius: 12,
					backgroundColor: 'rgba(0, 0, 0, 0.55)',
					textShadow: '0 2px 6px rgba(0,0,0,0.6)',
				}}
			>
				{active.text}
			</div>
		</AbsoluteFill>
	);
};
