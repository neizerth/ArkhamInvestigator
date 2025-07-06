import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { selectRevealedTokenIds } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { canRevealChaosTokens } from "../../../logic";

export const selectCanRevealChaosTokens = (count: number) =>
	createSelector(
		[selectRevealedTokenIds, selectChaosBagContents],
		(revealedIds, contents) => {
			return canRevealChaosTokens({
				revealedIds,
				contents,
				count,
			});
		},
	);
