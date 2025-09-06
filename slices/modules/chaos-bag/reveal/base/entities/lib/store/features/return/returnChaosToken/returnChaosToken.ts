import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import type { RemoveRevealedTokenIdPayload } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createAction } from "@reduxjs/toolkit";

export type ReturnChaosTokenPayload = RemoveRevealedTokenIdPayload;

export const returnChaosToken = createAction<ReturnChaosTokenPayload>(
	`${chaosBagRevealPrefix}/returnChaosToken`,
);

export type ChaosTokenReturnedPayload = {
	token: ChaosBagToken;
};

export const chaosTokenReturned = createAction<ChaosTokenReturnedPayload>(
	`${chaosBagRevealPrefix}/chaosTokenReturned`,
);
