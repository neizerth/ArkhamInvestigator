import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { chaosBagRevealPrefix } from "../../../../shared/config";

export type UpdateCurrentRevealHistoryItemPayload = PropsWithBoardId;

export const updateCurrentRevealHistoryItem =
	createAction<UpdateCurrentRevealHistoryItemPayload>(
		`${chaosBagRevealPrefix}/updateCurrentHistoryItem`,
	);
