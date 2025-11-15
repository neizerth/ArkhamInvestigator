import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

type HandleUnsealMoonTokenPayload = PropsWithBoardId & {
	token: ChaosBagToken;
	returnToRevealModal?: boolean;
};

export const handleUnsealMoonToken = createAction<HandleUnsealMoonTokenPayload>(
	"unsealChaosToken/handleUnsealMoonToken",
);
