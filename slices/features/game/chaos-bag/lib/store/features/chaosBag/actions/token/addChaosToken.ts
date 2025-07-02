import type { AppThunk } from "@shared/model";
import { v4 } from "uuid";
import type { ChaosBagToken, ChaosTokenType } from "../../../../../../model";
import { selectChaosBagContents, setChaosBagContents } from "../../chaosBag";
import { selectChaosTokenCount } from "../../selectors/contents/selectChaosTokenCount";
import { setChaosTokenCount } from "./setChaosTokenCount";

export const addChaosToken =
	(type: ChaosTokenType): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const contents = selectChaosBagContents(state);
		const count = selectChaosTokenCount(type)(state);

		const item: ChaosBagToken = {
			id: v4(),
			type,
		};

		dispatch(setChaosBagContents([...contents, item]));
		dispatch(setChaosTokenCount(type, count + 1));
	};
