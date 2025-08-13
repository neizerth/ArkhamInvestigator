import type { StoriesState } from "@modules/stories/shared/lib";
import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	stories?: StoriesState;
};

export default function v12(state?: State) {
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
