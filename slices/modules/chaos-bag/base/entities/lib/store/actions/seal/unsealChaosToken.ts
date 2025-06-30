import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import { createAction } from "@reduxjs/toolkit";

export type UnsealChaosTokenPayload = PropsWithBoardId & {
	id: string;
};

export const unsealChaosToken = createAction<UnsealChaosTokenPayload>(
	`${chaosBagPrefix}/unsealToken`,
);

export const chaosTokenUnsealed = createAction<UnsealChaosTokenPayload>(
	`${chaosBagPrefix}/tokenUnsealed`,
);
