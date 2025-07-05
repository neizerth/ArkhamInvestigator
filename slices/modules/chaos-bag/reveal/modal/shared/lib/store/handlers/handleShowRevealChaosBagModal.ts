import type { ChaosBagHandler } from "@modules/chaos-bag/base/shared/model";

export const handleShowRevealChaosBagModal: ChaosBagHandler = (state) => {
	if (!state.enabled) {
		return;
	}

	state.showRevealModal = true;
};
