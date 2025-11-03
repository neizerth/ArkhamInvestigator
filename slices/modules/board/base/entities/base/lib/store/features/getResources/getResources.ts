import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type GetResourcesPayload = PropsWithBoardId & {
	count?: number;
};

export const getResources =
	createAction<GetResourcesPayload>("board/getResources");
