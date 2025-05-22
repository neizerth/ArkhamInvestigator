import type { IStoriesState } from "@shared/lib";
import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	stories?: IStoriesState;
};

export default function v13(state?: State) {
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
