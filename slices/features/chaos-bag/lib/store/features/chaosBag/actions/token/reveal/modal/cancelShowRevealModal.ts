import type { AppThunk } from "@shared/model";
import { setShowRevealChaosTokenModal } from "../../../../chaosBag";
import { selectRevealedTokensCount } from "../../../../selectors";

export const cancelShowRevealModal = (): AppThunk => (dispatch, getState) => {
	const state = getState();

	const revealedCount = selectRevealedTokensCount(state);

	if (revealedCount > 0) {
		return;
	}

	dispatch(setShowRevealChaosTokenModal(false));
};
