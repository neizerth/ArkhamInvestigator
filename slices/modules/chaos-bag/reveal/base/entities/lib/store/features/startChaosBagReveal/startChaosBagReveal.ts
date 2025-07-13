import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import type { StartChaosBagRevealInternalPayload } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createAction } from "@reduxjs/toolkit";

export type StartChaosBagRevealPayload = StartChaosBagRevealInternalPayload;

export const startChaosBagReveal = createAction<StartChaosBagRevealPayload>(
	`${chaosBagRevealPrefix}/start`,
);
