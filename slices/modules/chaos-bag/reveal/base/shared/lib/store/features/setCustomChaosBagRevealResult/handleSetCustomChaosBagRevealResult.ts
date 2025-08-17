import type { ChaosBagRevealHandler } from "@modules/chaos-bag/reveal/base/shared/model";

export type SetCustomChaosBagRevealResultPayload = {
	result: number;
	succeedBy: number;
	failed: boolean;
};

export const handleSetCustomChaosBagRevealResult: ChaosBagRevealHandler<
	SetCustomChaosBagRevealResultPayload
> = (state, payload) => {
	state.failed = payload.failed;
	state.result = payload.result;
	state.succeedBy = payload.succeedBy;
};
