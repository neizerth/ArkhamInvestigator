import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import { createAction } from "@reduxjs/toolkit";

export const continueChaosBagReveal = createAction(
	`${chaosBagRevealPrefix}/continue`,
);
