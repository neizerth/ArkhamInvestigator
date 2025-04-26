import type { AppThunk } from "@shared/model";
import type { ChaosTokenType } from "../../../../../model";
import {
	selectChaosBagSealedTokens,
	setChaosBagSealedTokens,
} from "../chaosBag";

export const setSealedChaosTokenCount =
	(type: ChaosTokenType, count: number): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const contents = selectChaosBagSealedTokens(state);

		dispatch(
			setChaosBagSealedTokens({
				...contents,
				[type]: count,
			}),
		);
	};
