import type { AppThunk } from "@shared/model";
import { closeRevealChaosTokenModal } from "./token";

export const initChaosBag = (): AppThunk => (dispatch) => {
	dispatch(closeRevealChaosTokenModal());
};
