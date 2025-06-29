import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { chaosBagPrefix } from "../../../../config";

export type SealChaosTokenPayload = PropsWithBoardId & {
	id: string;
};

export const sealChaosToken = createAction<SealChaosTokenPayload>(
	`${chaosBagPrefix}/sealToken`,
);

export const chaosTokenSealed = createAction<SealChaosTokenPayload>(
	`${chaosBagPrefix}/tokenSealed`,
);
