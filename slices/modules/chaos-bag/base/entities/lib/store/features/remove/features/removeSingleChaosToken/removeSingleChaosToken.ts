import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type {
	ChaosBagChangeSource,
	ChaosBagToken,
} from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type RemoveSingleChaosTokenPayload = Partial<PropsWithBoardId> & {
	source?: ChaosBagChangeSource;
	token: ChaosBagToken;
};

export const removeSingleChaosToken =
	createAction<RemoveSingleChaosTokenPayload>(
		`${chaosBagPrefix}/removeSingleToken`,
	);

export type SingleChaosTokenRemovedPayload = Partial<PropsWithBoardId> & {
	token: ChaosBagToken;
};

export const singleChaosTokenRemoved =
	createAction<SingleChaosTokenRemovedPayload>(
		`${chaosBagPrefix}/singleTokenRemoved`,
	);
