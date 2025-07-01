import { selectIsSkillCheckHistoryItemPinned } from "./selectIsSkillCheckHistoryItemPinned";
import { selectSkillCheckHistory } from "./selectSkillCheckHistory";
import { selectSkillCheckHistoryItem } from "./selectSkillCheckHistoryItem";
import { selectSkillCheckHistoryItemTitle } from "./selectSkillCheckHistoryItemTitle";

export const selectIsCurrentSkillCheckHistoryItemPinned = (id: string) =>
	selectIsSkillCheckHistoryItemPinned({
		boardId: "current",
		id,
	});

export const selectCurrentSkillCheckHistory =
	selectSkillCheckHistory("current");

export const selectCurrentSkillCheckHistoryItem = (id: string) =>
	selectSkillCheckHistoryItem({
		boardId: "current",
		id,
	});

export const selectCurrentSkillCheckHistoryItemTitle = (id: string) =>
	selectSkillCheckHistoryItemTitle({
		boardId: "current",
		id,
	});
