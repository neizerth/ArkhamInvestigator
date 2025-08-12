import type {
	BoardId,
	PropsWithBoardId,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type OpenFatherMateoConfirmPayload = PropsWithBoardId & {
	sourceBoardId: BoardId;
};

export const openFatherMateoConfirm =
	createAction<OpenFatherMateoConfirmPayload>("FatherMateo/openConfirm");
