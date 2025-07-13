import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import { createAction } from "@reduxjs/toolkit";

export const returnAllChaosTokens = createAction(
	`${chaosBagRevealPrefix}/returnAllChaosTokens`,
);

export const allChaosTokensReturned = createAction(
	`${chaosBagRevealPrefix}/allChaosTokensReturned`,
);
