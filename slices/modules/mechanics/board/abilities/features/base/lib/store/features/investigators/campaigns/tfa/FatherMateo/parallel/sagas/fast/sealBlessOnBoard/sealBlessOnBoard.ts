import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

type SealBlessOnBoardPayload = PropsWithBoardId & {
	targetBoardId: number;
};

export const sealBlessOnBoard = createAction<SealBlessOnBoardPayload>(
	"ParallelFatherMateo/sealBlessOnBoard",
);
