import { chaosBagRevealModalPrefix } from "@modules/chaos-bag/reveal/modal/shared/config";
import { createAction } from "@reduxjs/toolkit";

export const openChaosTokenRevealModal = createAction<boolean | undefined>(
	`${chaosBagRevealModalPrefix}/open`,
);
