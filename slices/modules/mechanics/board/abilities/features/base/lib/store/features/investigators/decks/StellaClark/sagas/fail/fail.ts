import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

type FailPayload = PropsWithBoardId & {
	historyId: string;
};

export const fail = createAction<FailPayload>("StellaClark/fail");

export const failProcessed = createAction<FailPayload>(
	"StellaClark/failProcessed",
);
