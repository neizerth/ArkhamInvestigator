import type { ChaosBagHandler } from "@modules/chaos-bag/base/shared/model";
import { canCancelShowRevealModal } from "../../logic";

export const handleCancelShowRevealChaosBagModal: ChaosBagHandler = (state) => {
	const revealedTokensCount = state.revealedTokenIds.length;

	if (!canCancelShowRevealModal({ revealedTokensCount })) {
		return;
	}

	state.showRevealModal = false;
};
