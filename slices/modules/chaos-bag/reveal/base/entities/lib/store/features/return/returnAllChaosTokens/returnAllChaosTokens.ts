import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export const returnAllChaosTokens = createAction(
	`${chaosBagRevealPrefix}/returnAllChaosTokens`,
);

export type AllChaosTokensReturnedPayload = {
	tokens: RevealedChaosBagToken[];
};

export const allChaosTokensReturned =
	createAction<AllChaosTokensReturnedPayload>(
		`${chaosBagRevealPrefix}/allChaosTokensReturned`,
	);
