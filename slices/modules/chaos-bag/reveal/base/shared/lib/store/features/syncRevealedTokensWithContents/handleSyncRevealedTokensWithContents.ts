import type {
	ChaosBagToken,
	ChaosTokenValues,
} from "@modules/chaos-bag/base/shared/model";
import type {
	ChaosBagRevealHandler,
	RevealedChaosBagToken,
} from "@modules/chaos-bag/reveal/base/shared/model";
import { whereId } from "@shared/lib/util";

export type HandleSyncRevealedTokensWithContentsPayload = {
	contents: ChaosBagToken[];
	values: ChaosTokenValues;
};

export const handleSyncRevealedTokensWithContents: ChaosBagRevealHandler<
	HandleSyncRevealedTokensWithContentsPayload
> = (state, { contents, values }) => {
	const update = (token: RevealedChaosBagToken) => {
		const chaosBagToken = contents.find(whereId(token.id));

		const value = values[token.type] || token.value;

		const updatedValue = {
			...token,
			value,
		};

		if (!chaosBagToken) {
			return updatedValue;
		}

		return {
			...updatedValue,
			value,
		};
	};
	state.revealedTokens = state.revealedTokens.map(update);
	state.allRevealedTokens = state.allRevealedTokens.map(update);
};
