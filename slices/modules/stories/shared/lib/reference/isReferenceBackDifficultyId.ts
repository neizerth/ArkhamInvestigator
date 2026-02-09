import { backReferenceCardDifficulties } from "@modules/stories/shared/config";

export const isReferenceBackDifficultyId = (difficultyId?: string) => {
	if (!difficultyId) {
		return false;
	}

	return backReferenceCardDifficulties.includes(difficultyId);
};
