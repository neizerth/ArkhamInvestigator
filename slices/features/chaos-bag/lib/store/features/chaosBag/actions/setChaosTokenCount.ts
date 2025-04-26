import type { AppThunk } from "@shared/model";
import type { ChaosTokenType } from "../../../../../model";
import { selectChaosBagContents, setChaosBagContents } from "../chaosBag";

export const setChaosTokenCount =
	(type: ChaosTokenType, count: number): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const contents = selectChaosBagContents(state);

		dispatch(
			setChaosBagContents({
				...contents,
				[type]: count,
			}),
		);
	};
