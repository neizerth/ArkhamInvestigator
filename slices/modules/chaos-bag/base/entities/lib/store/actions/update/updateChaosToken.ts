import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type { ChaosBagTokenData } from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type UpdateChaosTokenPayload = Partial<PropsWithBoardId> & {
	id: string;
	data: Partial<ChaosBagTokenData>;
};

export const updateChaosToken = createAction<UpdateChaosTokenPayload>(
	`${chaosBagPrefix}/updateToken`,
);

export const chaosTokenUpdated = createAction<UpdateChaosTokenPayload>(
	`${chaosBagPrefix}/tokenUpdated`,
);
