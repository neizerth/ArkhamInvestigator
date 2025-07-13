import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import { last, prop } from "ramda";
import type { ChaosBagRevealHandler } from "../../../../model";

export type HandleAddRevealedTokensPayload = {
	tokens: ChaosBagToken[];
};

export const handleAddRevealedTokens: ChaosBagRevealHandler<
	HandleAddRevealedTokensPayload
> = (state, { tokens }) => {
	const lastToken = last(tokens);
	const tokenIds = tokens.map(prop("id"));
	const lastTokenId = lastToken?.id || null;

	state.revealedTokenIds.push(...tokenIds);
	state.currentRevealedTokenId = lastTokenId;
};
