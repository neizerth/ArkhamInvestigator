import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { selectRevealedTokenIds } from "@modules/chaos-bag/reveal/base/shared/lib";
import type { RootState } from "@shared/model";
import { getRandomChaosTokens } from "../../../logic";

export const selectRandomUnrevealedChaosTokens =
	(count: number) => (state: RootState) => {
		const revealedIds = selectRevealedTokenIds(state);
		const contents = selectChaosBagContents(state);
		return getRandomChaosTokens({
			revealedIds,
			contents,
			count,
		});
	};
