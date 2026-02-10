// biome-ignore lint/suspicious/noExplicitAny: migration
export default function setDefaultReferenceCardParams(state?: any) {
	if (!state?.stories) {
		return;
	}

	return {
		...state,
		stories: {
			...state.stories,
			showTranslatedOnlyStories: true,
			showFanMadeStories: false,
		},
	};
}
