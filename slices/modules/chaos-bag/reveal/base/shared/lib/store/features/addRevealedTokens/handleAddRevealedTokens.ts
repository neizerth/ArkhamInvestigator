import { last } from "ramda";
import type {
	ChaosBagRevealHandler,
	RevealedChaosBagToken,
} from "../../../../model";

export type HandleAddRevealedTokensPayload = {
	tokens: RevealedChaosBagToken[];
};

export const handleAddRevealedTokens: ChaosBagRevealHandler<
	HandleAddRevealedTokensPayload
> = (state, { tokens }) => {
	const lastToken = last(tokens);
	const lastTokenId = lastToken?.id || null;

	state.revealedTokens.push(...tokens);
	state.allRevealedTokens.push(...tokens);
	state.currentRevealedTokenId = lastTokenId;
};
