import type {
	ChaosBagRevealHandler,
	RevealedChaosBagToken,
} from "../../../../model";

export type HandleUpdateRevealedTokenInternalPayload = {
	id: string;
	data: Partial<Omit<RevealedChaosBagToken, "id">>;
	updateType?: "actual" | "all";
};

export const handleUpdateRevealedTokenInternal: ChaosBagRevealHandler<
	HandleUpdateRevealedTokenInternalPayload
> = (state, { id, data, updateType }) => {
	const update = (token: RevealedChaosBagToken) => {
		if (token.id === id) {
			return {
				...token,
				...data,
			};
		}
		return token;
	};
	if (!updateType || updateType === "actual") {
		state.revealedTokens = state.revealedTokens.map(update);
	}
	if (!updateType || updateType === "all") {
		state.allRevealedTokens = state.allRevealedTokens.map(update);
	}
};
