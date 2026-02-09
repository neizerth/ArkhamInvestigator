// biome-ignore lint/suspicious/noExplicitAny: migration
export default function v12(state?: any) {
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
