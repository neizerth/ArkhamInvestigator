import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import type { ChaosBagRevealState } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createAction } from "@reduxjs/toolkit";

export const endChaosBagReveal = createAction(`${chaosBagRevealPrefix}/end`);

export type ChaosBagRevealEndPayload = ChaosBagRevealState;

export const chaosBagRevealEnd = createAction<ChaosBagRevealEndPayload>(
	`${chaosBagRevealPrefix}/revealEnd`,
);
