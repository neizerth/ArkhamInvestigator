import {
	createBoardThunk,
	createCurrentActionCreator,
} from "@modules/board/base/shared/lib";
import { removeBoardSkillCheckItemAction } from "../../actions";

export const removeBoardSkillCheckItem = createBoardThunk(
	removeBoardSkillCheckItemAction,
);

export const removeCurrentSkillCheckItem = createCurrentActionCreator(
	removeBoardSkillCheckItem,
);
