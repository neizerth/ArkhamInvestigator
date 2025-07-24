import type { ChaosBagRevealHandler } from "../../../../model";

export type HandleUpdateRevealedTokenPayload = {
	id: string;
	sealed?: boolean;
	value?: number;
};

export const handleUpdateRevealedToken: ChaosBagRevealHandler<
	HandleUpdateRevealedTokenPayload
> = (state, { id, ...update }) => {
	state.revealedTokens = state.revealedTokens.map((token) => {
		if (token.id === id) {
			return {
				...token,
				...update,
			};
		}
		return token;
	});
};
