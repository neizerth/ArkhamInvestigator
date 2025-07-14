import type { RootState } from "@shared/model";
import { selectStories, selectStoryCode } from "../stories";

export const selectStory = (state: RootState) => {
	const code = selectStoryCode(state);
	const stories = selectStories(state);
	if (!code) {
		return null;
	}
	return stories.find((story) => story.code === code);
};
