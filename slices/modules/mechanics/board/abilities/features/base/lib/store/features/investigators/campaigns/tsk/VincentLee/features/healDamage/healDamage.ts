import type { BoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type HealDamagePayload = {
	boardId: BoardId;
	targetBoardId: BoardId;
};

export const healDamage = createAction<HealDamagePayload>(
	"VincentLee/healHorror",
);
