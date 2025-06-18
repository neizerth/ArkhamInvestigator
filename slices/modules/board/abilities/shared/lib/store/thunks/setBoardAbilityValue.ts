import { createBoardThunk } from "@modules/board/base/shared/lib";
import { changeBoardAbilityValue } from "../actions/changeBoardAbilityValue";

export const setBoardAbilityValueInternal = createBoardThunk(
	changeBoardAbilityValue,
);
