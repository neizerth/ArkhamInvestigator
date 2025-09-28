import type { ChaosBagHandler } from "@modules/chaos-bag/base/shared/model";

export const handleClearChaosBagInternal: ChaosBagHandler = (
	state,
	payload,
) => {
	state.contents = [];
	state.tokenCount = {};
};
