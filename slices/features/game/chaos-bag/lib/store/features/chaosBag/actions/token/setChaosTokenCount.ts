import type { AppThunk } from "@shared/model";
import type { ChaosTokenType } from "../../../../../../model";
import {
	selectChaosBagTokenCount,
	setChaosBagTokenCount,
} from "../../chaosBag";

export const setChaosTokenCount =
	(type: ChaosTokenType, count: number): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const contents = selectChaosBagTokenCount(state);

		dispatch(
			setChaosBagTokenCount({
				...contents,
				[type]: count,
			}),
		);
	};
