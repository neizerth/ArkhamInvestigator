import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/entities/shared/config";
import { createAction } from "@reduxjs/toolkit";

export type ReturnChaosTokenPayload = {
	id: string;
};

export const returnChaosToken = createAction<ReturnChaosTokenPayload>(
	`${chaosBagRevealPrefix}/returnChaosToken`,
);
