import { createCurrentActionCreator } from "@modules/board/base/shared/lib";
import { addBoardSkillCheckitem } from "./addBoardSkillCheckitem";
import { removeBoardSkillCheckItem } from "./removeBoardSkillCheckItem";

export const addCurrentSkillCheckItem = createCurrentActionCreator(
	addBoardSkillCheckitem,
);

export const removeCurrentSkillCheckItem = createCurrentActionCreator(
	removeBoardSkillCheckItem,
);
