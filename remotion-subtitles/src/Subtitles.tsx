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
const BRUSH_COLOR = '#3a3a3d';

const BrushBackground: React.FC = () => (
	<svg
		style={{
			position: 'absolute',
			inset: -28,
			width: 'calc(100% + 56px)',
			height: 'calc(100% + 56px)',
			zIndex: 0,
		}}
		viewBox="0 0 100 100"
		preserveAspectRatio="none"
	>
		<filter id="brush-rough">
			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.015 0.09"
				numOctaves={2}
				seed={7}
				result="noise"
			/>
			<feDisplacementMap
				in="SourceGraphic"
				in2="noise"
				scale={12}
				xChannelSelector="R"
				yChannelSelector="G"
			/>
		</filter>
		<rect x={6} y={12} width={88} height={76} fill={BRUSH_COLOR} fillOpacity={0.88} filter="url(#brush-rough)" />
	</svg>
);

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
			<div style={{position: 'relative', display: 'inline-block', padding: '20px 36px'}}>
				<BrushBackground />
				<div
					style={{
						position: 'relative',
						zIndex: 1,
						fontFamily: '"Arial Black", Arial, sans-serif',
						fontSize: 64,
						fontWeight: 900,
						textTransform: 'uppercase',
						textAlign: 'center',
						maxWidth: '88vw',
						lineHeight: 1.25,
						textShadow: '0 2px 4px rgba(0,0,0,0.5)',
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
			</div>
		</AbsoluteFill>
	);
};
