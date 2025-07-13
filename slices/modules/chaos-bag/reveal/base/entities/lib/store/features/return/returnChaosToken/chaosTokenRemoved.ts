import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import { createAction } from "@reduxjs/toolkit";

export type ChaosTokenRemovedPayload = {
	token: ChaosBagToken;
};

export const chaosTokenRemoved = createAction<ChaosTokenRemovedPayload>(
	`${chaosBagRevealPrefix}/chaosTokenRemoved`,
);
