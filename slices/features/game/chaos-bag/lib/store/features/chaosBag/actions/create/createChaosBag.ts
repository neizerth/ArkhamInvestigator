import type { AppThunk } from "@shared/model";
import { repeat } from "ramda";
import { v4 } from "uuid";
import { chaosToken } from "../../../../../../config";
import { selectChaosBagTokenCount, setChaosBagContents } from "../../chaosBag";

export const createChaosBag = (): AppThunk => (dispatch, getState) => {
	const state = getState();
	const tokensCount = selectChaosBagTokenCount(state);

	const contents = chaosToken.types.all
		.flatMap((type) => {
			const count = tokensCount?.[type] || 0;
			return repeat(type, count);
		})
		.map((type) => ({
			id: v4(),
			type,
			removable: chaosToken.types.removable.includes(type),
		}));

	dispatch(setChaosBagContents(contents));
};
