import type { AppThunk } from "@shared/model";
import {
	selectChaosBagEnabled,
	setShowRevealChaosTokenModal,
} from "../../../../chaosBag";

export const openRevealChaosTokenModal =
	(): AppThunk => (dispatch, getState) => {
		const state = getState();
		const enabled = selectChaosBagEnabled(state);

		if (!enabled) {
			return;
		}

		dispatch(setShowRevealChaosTokenModal(true));
	};
