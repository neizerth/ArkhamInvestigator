import { whereId } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { equals, reject } from "ramda";
import type { ChaosBagToken } from "../../../../../../../model";
import {
	selectChaosBagContents,
	selectRevealedTokenIds,
	setChaosBagContents,
	setRevealedTokenIds,
} from "../../../chaosBag";
import { selectChaosTokenCount } from "../../../selectors";
import { setChaosTokenCount } from "../setChaosTokenCount";

export const returnChaosToken =
	(token: ChaosBagToken): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const contents = selectChaosBagContents(state);
		const revealedIds = selectRevealedTokenIds(state);

		if (!token) {
			return;
		}

		const { type, id } = token;

		const revealedData = reject(equals(id), revealedIds);

		dispatch(setRevealedTokenIds(revealedData));

		if (!token.removable || token.sealed) {
			return;
		}

		const tokenCount = selectChaosTokenCount(type)(state);

		const data = reject(whereId(id), contents);

		dispatch(setChaosBagContents(data));
		dispatch(setChaosTokenCount(type, tokenCount - 1));
	};
