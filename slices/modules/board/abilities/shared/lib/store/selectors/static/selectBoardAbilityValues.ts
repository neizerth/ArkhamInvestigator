import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";

export const selectBoardAbilityValues = (boardId: BoardId) =>
	selectBoardProp({
		boardId,
		prop: "abilityValues",
	});
