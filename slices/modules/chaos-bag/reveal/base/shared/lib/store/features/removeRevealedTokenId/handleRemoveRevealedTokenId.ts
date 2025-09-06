import { whereId } from "@shared/lib/util";
import { last, reject } from "ramda";
import type { ChaosBagRevealHandler } from "../../../../model";

export type HandleRemoveRevealedTokenIdPayload = {
	id: string;
	type: "remove" | "return";
};

export const handleRemoveRevealedTokenId: ChaosBagRevealHandler<
	HandleRemoveRevealedTokenIdPayload
> = (state, { id, type }) => {
	const tokens = reject(whereId(id), state.revealedTokens);
	state.revealedTokens = tokens;

	state.allRevealedTokens = state.allRevealedTokens.map((token) => {
		if (token.id === id && type === "remove") {
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
