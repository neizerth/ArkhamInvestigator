import type { ChaosBagHandler } from "@modules/chaos-bag/base/shared/model";

export const handleClearChaosTokenValue: ChaosBagHandler = (state) => {
	state.chaosTokenValue = null;
};
