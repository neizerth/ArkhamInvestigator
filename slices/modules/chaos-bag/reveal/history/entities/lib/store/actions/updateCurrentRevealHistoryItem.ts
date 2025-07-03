import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import { createAction } from "@reduxjs/toolkit";

export type UpdateCurrentRevealHistoryItemPayload = PropsWithBoardId;

export const updateCurrentRevealHistoryItem =
	createAction<UpdateCurrentRevealHistoryItemPayload>(
		`${chaosBagRevealPrefix}/updateCurrentHistoryItem`,
	);
