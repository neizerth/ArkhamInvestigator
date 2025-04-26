import type { AppThunk } from "@shared/model";
import { setChaosBagContents } from "../chaosBag";
import { selectChaosBagTokens } from "../selectors";

export const createChaosBag = (): AppThunk => (dispatch, getState) => {
	const state = getState();
	const contents = selectChaosBagTokens(state);

	dispatch(setChaosBagContents(contents));
};
