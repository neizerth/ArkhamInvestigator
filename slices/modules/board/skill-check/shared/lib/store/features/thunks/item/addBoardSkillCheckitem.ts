import {
	createBoardThunk,
	createCurrentActionCreator,
} from "@modules/board/base/shared/lib";
import { addBoardSkillCheckItemAction } from "../../actions";

export const addBoardSkillCheckitem = createBoardThunk(
	addBoardSkillCheckItemAction,
);

export const addCurrentSkillCheckItem = createCurrentActionCreator(
	addBoardSkillCheckitem,
);
