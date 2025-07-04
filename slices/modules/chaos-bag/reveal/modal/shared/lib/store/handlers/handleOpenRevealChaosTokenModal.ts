import type { ChaosBagHandler } from "@modules/chaos-bag/base/shared/model";

// TODO
export const handleOpenRevealChaosTokenModal: ChaosBagHandler = (state) => {
	if (!state.enabled) {
		return;
	}

	state.showRevealModal = true;
};
