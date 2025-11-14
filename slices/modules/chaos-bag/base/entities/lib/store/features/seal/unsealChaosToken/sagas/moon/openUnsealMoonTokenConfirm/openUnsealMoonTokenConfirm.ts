import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

type OpenUnsealMoonTokenConfirmPayload = PropsWithBoardId & {
	id: string;
};

export const openUnsealMoonTokenConfirm =
	createAction<OpenUnsealMoonTokenConfirmPayload>(
		"unsealChaosToken/openUnsealMoonTokenConfirm",
	);
