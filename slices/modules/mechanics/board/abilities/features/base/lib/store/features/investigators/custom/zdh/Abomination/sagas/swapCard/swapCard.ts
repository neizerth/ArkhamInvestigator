import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type SwapCardPayload = PropsWithBoardId & {
	code: string;
};

export const swapCard = createAction<SwapCardPayload>("Abomination/swapCard");
