import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { selectRevealedTokenIds } from "@modules/chaos-bag/reveal/base/shared/lib";
import type { RootState } from "@shared/model";
import { canRevealChaosTokens } from "../../../logic";

export const selectCanRevealChaosTokens =
	(count: number) => (state: RootState) => {
		const revealedIds = selectRevealedTokenIds(state);
		const contents = selectChaosBagContents(state);
		return canRevealChaosTokens({
			revealedIds,
			contents,
			count,
		});
	};
