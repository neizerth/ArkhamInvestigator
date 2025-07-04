import type {
	ChaosBagHandler,
	ChaosBagToken,
} from "@modules/chaos-bag/base/shared/model";
import { last, prop } from "ramda";

export type HandleAddRevealedTokensPayload = {
	tokens: ChaosBagToken[];
};

export const handleAddRevealedTokens: ChaosBagHandler<
	HandleAddRevealedTokensPayload
> = (state, { tokens }) => {
	const lastToken = last(tokens);
	const tokenIds = tokens.map(prop("id"));
	const lastTokenId = lastToken?.id || null;

	state.revealedTokenIds.push(...tokenIds);
	state.currentTokenId = lastTokenId;
};
