import type {
	ChaosBagToken,
	ChaosTokenValues,
} from "@modules/chaos-bag/base/shared/model";
import type { ChaosTokenRevealCount } from "@modules/chaos-bag/effect/entities/model";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import type { ChaosBagOddsToken } from "../../model";

type Options = {
	contents: ChaosBagToken[];
	revealedTokens: RevealedChaosBagToken[];
	revealCount: ChaosTokenRevealCount;
	values: ChaosTokenValues;
};

export const getBoardChaosOddsTokens = ({
	contents,
	revealedTokens,
	revealCount: revealCountMap,
	values: valuesMap,
}: Options) => {
	const revealed = revealedTokens.filter(({ canceled }) => !canceled);

	return contents
		.filter(({ sealed }) => !sealed)
		.map((token): ChaosBagOddsToken => {
			const revealedToken = revealed.find(({ id }) => id === token.id);
			const revealCount = revealCountMap[token.type];
			const value = valuesMap[token.type];

			if (!revealedToken) {
				return {
					...token,
					revealCount,
					value,
				};
			}

			return {
				value,
				...revealedToken,
				revealCount,
			};
		});
};
