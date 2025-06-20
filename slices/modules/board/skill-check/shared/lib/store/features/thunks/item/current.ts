import { createCurrentActionCreator } from "@modules/board/base/shared/lib";
import { addBoardSkillCheckitem } from "./addBoardSkillCheckitem";
import { removeBoardSkillCheckItem } from "./removeBoardSkillCheckItem";
import { setSkillCheckHistoryItemTitle } from "./setSkillCheckHistoryItemTitle";
import { toggleSkillCheckHistoryItemPin } from "./toggleSkillCheckHistoryItemPin";

export const addCurrentSkillCheckItem = createCurrentActionCreator(
	addBoardSkillCheckitem,
);

export const removeCurrentSkillCheckItem = createCurrentActionCreator(
	removeBoardSkillCheckItem,
);

export const setCurrentSkillCheckHistoryItemTitle = createCurrentActionCreator(
	setSkillCheckHistoryItemTitle,
);

export const toggleCurrentSkillCheckHistoryItemPin = createCurrentActionCreator(
	toggleSkillCheckHistoryItemPin,
);
