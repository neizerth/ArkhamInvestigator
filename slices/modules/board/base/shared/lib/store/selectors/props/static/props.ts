import type { BoardId } from "@modules/board/base/shared/model";
import { selectBoardProp } from "../selectBoardProp";

export const selectBoardAbilityValues = (boardId: BoardId) =>
	selectBoardProp({
		boardId,
		prop: "abilityValues",
	});

export const selectBoardUsedAbilities = (boardId: BoardId) =>
	selectBoardProp({
		boardId,
		prop: "usedAbilities",
	});

export const selectBoardCheckHistory = (boardId: BoardId) =>
	selectBoardProp({
		boardId,
		prop: "checkHistory",
	});
