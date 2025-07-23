import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type SaveCurrentRevealHistoryItemPayload = PropsWithBoardId & {
	tokens?: RevealedChaosBagToken[];
};

export const saveCurrentRevealHistoryItem =
	createAction<SaveCurrentRevealHistoryItemPayload>(
		`${chaosBagRevealPrefix}/saveCurrentHistoryItem`,
	);

export const createCurrentRevealHistoryItem =
	createAction<SaveCurrentRevealHistoryItemPayload>(
		`${chaosBagRevealPrefix}/createCurrentHistoryItem`,
	);

export const updateCurrentRevealHistoryItem =
	createAction<SaveCurrentRevealHistoryItemPayload>(
		`${chaosBagRevealPrefix}/updateCurrentHistoryItem`,
	);
