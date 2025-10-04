import { backReferenceCardDifficulties } from "@modules/stories/shared/config";

export const isReferenceBackDifficultyId = (difficultyId: string) => {
	return backReferenceCardDifficulties.includes(difficultyId);
};
