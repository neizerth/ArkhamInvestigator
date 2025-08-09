import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import type {
	ChaosBagRevealHandler,
	RevealedChaosBagToken,
} from "../../../../model";

export type HandleSetRevealedTokenValuePayload = {
	type: ChaosTokenType;
	value: ChaosTokenValue;
};

export const handleSetRevealedTokenValue: ChaosBagRevealHandler<
	HandleSetRevealedTokenValuePayload
> = (state, { type, value }) => {
	const update = (token: RevealedChaosBagToken) => {
		if (token.type === type) {
			return {
				...token,
				value,
			};
		}
		return token;
	};

	state.revealedTokens = state.revealedTokens.map(update);
	state.allRevealedTokens = state.allRevealedTokens.map(update);
};
