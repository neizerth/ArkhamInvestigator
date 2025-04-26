import type { AppThunk } from "@shared/model";
import { repeat } from "ramda";
import type { ChaosTokenType } from "../../../../../model";
import { selectChaosBagTokenCount, setChaosBagContents } from "../chaosBag";

export const createChaosBag = (): AppThunk => (dispatch, getState) => {
	const state = getState();
	const tokensCount = selectChaosBagTokenCount(state);
	const contents = Object.entries(tokensCount).flatMap((entry) => {
		const type = entry[0] as ChaosTokenType;
		const count = entry[1];
		return repeat(type, count);
	});

	dispatch(setChaosBagContents(contents));
};
