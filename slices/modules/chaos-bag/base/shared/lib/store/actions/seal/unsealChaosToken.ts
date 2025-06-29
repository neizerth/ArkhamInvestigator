import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { chaosBagPrefix } from "../../../../config";

export type UnsealChaosTokenPayload = PropsWithBoardId & {
	id: string;
};

export const unsealChaosToken = createAction<UnsealChaosTokenPayload>(
	`${chaosBagPrefix}/unsealToken`,
);

export const chaosTokenUnsealed = createAction<UnsealChaosTokenPayload>(
	`${chaosBagPrefix}/tokenUnsealed`,
);
