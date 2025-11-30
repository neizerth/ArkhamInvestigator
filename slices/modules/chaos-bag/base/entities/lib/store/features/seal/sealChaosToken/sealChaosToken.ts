import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type { ChaosBagTokenSealData } from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type SealChaosTokenPayload = Partial<PropsWithBoardId> & {
	id: string;
	sealData?: ChaosBagTokenSealData;
};

export const sealChaosToken = createAction<SealChaosTokenPayload>(
	`${chaosBagPrefix}/sealToken`,
);

export const chaosTokenSealed = createAction<SealChaosTokenPayload>(
	`${chaosBagPrefix}/tokenSealed`,
);
