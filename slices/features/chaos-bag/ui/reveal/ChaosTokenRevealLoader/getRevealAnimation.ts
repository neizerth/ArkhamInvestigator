const MIN_FRAME_DURATION = 60;

export const getRevealAnimation = (duration: number) => {
	const calculatedFrameDuration = duration / 100;
	const frameDuration = Math.max(MIN_FRAME_DURATION, calculatedFrameDuration);

	const valuePerFrame = frameDuration / calculatedFrameDuration;

	return {
		frameDuration,
		valuePerFrame,
	};
};
