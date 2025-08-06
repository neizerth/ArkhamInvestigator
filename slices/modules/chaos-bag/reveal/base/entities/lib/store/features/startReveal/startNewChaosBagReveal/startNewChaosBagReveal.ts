import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import { createAction } from "@reduxjs/toolkit";
import type { StartChaosBagRevealPayload } from "../startChaosBagReveal";

export const startNewChaosBagReveal = createAction<StartChaosBagRevealPayload>(
	`${chaosBagRevealPrefix}/startNew`,
);
