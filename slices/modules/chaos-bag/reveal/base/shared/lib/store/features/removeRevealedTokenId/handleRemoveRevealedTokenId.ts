import { whereId } from "@shared/lib/util";
import { last, reject } from "ramda";
import type { ChaosBagRevealHandler } from "../../../../model";

export const handleRemoveRevealedTokenId: ChaosBagRevealHandler<string> = (
	state,
	id,
) => {
	const tokens = reject(whereId(id), state.revealedTokens);
	state.revealedTokens = tokens;

	state.allRevealedTokens = state.allRevealedTokens.map((token) => {
		if (token.id === id) {
			return {
				...token,
				removed: true,
			};
		}
		return token;
	});

	const lastToken = last(tokens);
	state.currentRevealedTokenId = lastToken?.id || null;
};
