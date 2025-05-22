import { propIncludes } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { shuffle } from "fast-shuffle";
import { last, prop, reject } from "ramda";
import {
	selectChaosBagContents,
	selectRevealedTokenIds,
	setCurrentTokenId,
	setRevealedTokenIds,
} from "../../../chaosBag";
import { updateCurrentRevealHistoryItem } from "../../history";

export const revealChaosToken =
	(count: number): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const revealed = selectRevealedTokenIds(state);
		const contents = selectChaosBagContents(state);

		if (contents.length === 0) {
			return;
		}
		const rest = reject(propIncludes("id", revealed), contents).filter(
			({ sealed }) => !sealed,
		);
		const tokens = shuffle(rest).slice(0, count);
		const lastToken = last(tokens);
		const tokenIds = tokens.map(prop("id"));

		const data = [...revealed, ...tokenIds];
		const lastTokenId = lastToken?.id || null;

		dispatch(setCurrentTokenId(lastTokenId));

		dispatch(setRevealedTokenIds(data));
		dispatch(updateCurrentRevealHistoryItem(tokens));
	};
