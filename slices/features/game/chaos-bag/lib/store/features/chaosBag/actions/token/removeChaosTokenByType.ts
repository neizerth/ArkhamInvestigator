import { whereId } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { ascend, propEq, reject } from "ramda";
import type { ChaosTokenType } from "../../../../../../model";
import { selectChaosBagContents, setChaosBagContents } from "../../chaosBag";
import { setChaosTokenCount } from "./setChaosTokenCount";

export const removeChaosTokenByType =
	(type: ChaosTokenType): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const contents = selectChaosBagContents(state);

		const tokens = contents
			.filter(propEq(type, "type"))
			.sort(ascend(({ sealed }) => Boolean(sealed)));

		const [token] = tokens;

		if (!token) {
			return;
		}

		const data = reject(whereId(token.id), contents);
		dispatch(setChaosBagContents(data));
		dispatch(setChaosTokenCount(type, tokens.length - 1));
	};
