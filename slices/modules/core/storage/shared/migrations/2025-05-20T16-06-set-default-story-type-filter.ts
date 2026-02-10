// biome-ignore lint/suspicious/noExplicitAny: migration
export default function setDefaultStoryTypeFilter(state?: any) {
	if (!state?.stories) {
		return;
	}

	return {
		...state,
		stories: {
			...state.stories,
			storyTypeFilter: "campaign",
		},
	};
}
