import type { ChaosBagHandler } from "@modules/chaos-bag/base/shared/model";

export const handleClearChaosBag: ChaosBagHandler = (state, payload) => {
	state.contents = [];
	state.tokenCount = {};
};
