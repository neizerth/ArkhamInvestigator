import { boardHistoryPrefix } from "@modules/board/history/shared/config";
import { createAction } from "@reduxjs/toolkit";

export const clearCurrentHistory = createAction(
	`${boardHistoryPrefix}/clearCurrent`,
);
