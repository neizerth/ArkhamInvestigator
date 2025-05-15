import type { AppThunk } from "@shared/model";
import { setRevealHistory } from "../../chaosBag";

export const clearRevealHistory = (): AppThunk => (dispatch) => {
	dispatch(setRevealHistory([]));
};
