import type { Story } from "../../model";

type Options = {
	story?: Story | null;
	difficultyId?: string | null;
};

export const getStoryDifficultyLevelById = ({
	story,
	difficultyId,
}: Options) => {
	if (!difficultyId || !story) {
		return;
	}
	return story.difficultyLevels.find((level) => level.id === difficultyId);
};
