import type { BoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type HealHorrorPayload = {
	boardId: BoardId;
	targetBoardId: BoardId;
};

export const healHorror = createAction<HealHorrorPayload>(
	"CarolynFern/healHorror",
);
