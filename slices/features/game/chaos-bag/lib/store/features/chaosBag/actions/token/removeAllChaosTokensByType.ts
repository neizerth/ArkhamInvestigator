import type { AppThunk } from "@shared/model";
import { propEq, reject } from "ramda";
import type { ChaosTokenType } from "../../../../../../model";
import { selectChaosBagContents, setChaosBagContents } from "../../chaosBag";
import { setChaosTokenCount } from "./setChaosTokenCount";

export const removeAllChaosTokensByType =
	(type: ChaosTokenType): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const contents = selectChaosBagContents(state);

		const data = reject(propEq(type, "type"), contents);
		dispatch(setChaosBagContents(data));
		dispatch(setChaosTokenCount(type, 0));
	};
