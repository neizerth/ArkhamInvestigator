import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type RemoveChaosTokenPayload = Partial<PropsWithBoardId> & {
	id: string;
};

export const removeChaosToken = createAction<RemoveChaosTokenPayload>(
	`${chaosBagPrefix}/removeToken`,
);

export type ChaosTokenRemovedPayload = Partial<PropsWithBoardId> & {
	token: ChaosBagToken;
};

export const chaosTokenRemoved = createAction<ChaosTokenRemovedPayload>(
	`${chaosBagPrefix}/tokenRemoved`,
);
