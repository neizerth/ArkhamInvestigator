import type { AppThunk } from "@shared/lib";
import { selectShowFactionSelect, setShowFactionSelect } from "../../board";

export const toggleFactionSelect = (): AppThunk => (dispatch, getState) => {
	const state = getState();
	const value = selectShowFactionSelect(state);

	dispatch(setShowFactionSelect(!value));
};
