import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { SaveCurrentRevealHistoryItemPayload } from "../saveCurrentRevealHistoryItem";

export type UpdateCurrentRevealHistoryItemPayload = PropsWithBoardId & {
	tokens?: RevealedChaosBagToken[];
};

export const updateCurrentRevealHistoryItem =
	createAction<SaveCurrentRevealHistoryItemPayload>(
		`${chaosBagRevealPrefix}/updateCurrentHistoryItem`,
	);
