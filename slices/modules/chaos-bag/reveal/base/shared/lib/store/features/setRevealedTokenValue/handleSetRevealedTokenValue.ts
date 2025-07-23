import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ChaosBagRevealHandler } from "../../../../model";

export type HandleSetRevealedTokenValuePayload = {
	type: ChaosTokenType;
	value: number;
};

export const handleSetRevealedTokenValue: ChaosBagRevealHandler<
	HandleSetRevealedTokenValuePayload
> = (state, { type, value }) => {
	state.revealedTokens = state.revealedTokens.map((token) => {
		if (token.type === type) {
			return {
				...token,
				value,
			};
		}
		return token;
	});
};
