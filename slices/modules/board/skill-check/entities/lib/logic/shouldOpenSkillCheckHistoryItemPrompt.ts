import type { SkillCheckHistoryItem } from "@modules/board/skill-check/shared/model";

export const shouldOpenSkillCheckHistoryItemPrompt = ({
	pinned,
	title,
}: SkillCheckHistoryItem) => {
	return !pinned && !title;
};
