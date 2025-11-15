import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

type OpenUnsealMoonTokenConfirmPayload = PropsWithBoardId & {
	id: string;
	returnToRevealModal?: boolean;
};

export const openUnsealMoonTokenConfirm =
	createAction<OpenUnsealMoonTokenConfirmPayload>(
		"unsealChaosToken/openUnsealMoonTokenConfirm",
	);
