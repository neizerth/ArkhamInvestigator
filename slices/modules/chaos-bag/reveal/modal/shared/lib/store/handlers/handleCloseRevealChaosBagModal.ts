import type { ChaosBagHandler } from "@modules/chaos-bag/base/shared/model";

export const handleCloseRevealChaosBagModal: ChaosBagHandler = (state) => {
	state.revealedTokenIds = [];
	state.skillValue = null;
	state.skillCheckTitle = null;
	state.skillCheckExpression = [];
	state.skillCheckType = null;
	state.showRevealModal = false;
};
