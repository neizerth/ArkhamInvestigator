import { whereId } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { ascend, propEq, reject } from "ramda";
import type { ChaosTokenType } from "../../../../../../model";
import { selectChaosBagContents, setChaosBagContents } from "../../chaosBag";

export const removeChaosTokenByType =
	(type: ChaosTokenType): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const contents = selectChaosBagContents(state);

		const [token] = contents
			.filter(propEq(type, "type"))
			.toSorted(ascend(({ sealed }) => Boolean(sealed)));

		if (!token) {
			return;
		}

		const data = reject(whereId(token.id), contents);
		dispatch(setChaosBagContents(data));
	};
