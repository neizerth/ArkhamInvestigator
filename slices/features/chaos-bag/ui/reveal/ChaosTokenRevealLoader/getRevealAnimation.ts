const MIN_FRAME_TIME = 30;

export const getRevealAnimation = (duration: number) => {
	const rate = duration / 100;
	const frameDuration = Math.max(duration, MIN_FRAME_TIME);

	const fps = duration / frameDuration;

	const valuePerFrame = (fps * 100) / rate;

	return {
		fps,
		valuePerFrame,
	};
};
