import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import type {
	ChaosBagRevealHandler,
	RevealedChaosBagToken,
} from "../../../../model";

export type HandleSetRevealedTokenValuePayload = {
	changeType?: "last" | "all";
	modify?: boolean;
	type: ChaosTokenType;
	value: ChaosTokenValue;
};

export const handleSetRevealedTokenValue: ChaosBagRevealHandler<
	HandleSetRevealedTokenValuePayload
> = (state, payload) => {
	const { type, value, changeType = "all", modify = true } = payload;

	const setValue = (tokens: RevealedChaosBagToken[]) => {
		let lastReplaceComplete = false;

		const reducer = (
			target: RevealedChaosBagToken[],
			token: RevealedChaosBagToken,
		) => {
			const skip = changeType === "last" && lastReplaceComplete;
			if (token.type !== type || skip) {
				target.push(token);
				return target;
			}
			if (changeType === "last") {
				lastReplaceComplete = true;
			}
			const updatedToken = {
				...token,
				value,
				modified: modify,
			};
			target.push(updatedToken);
			return target;
		};

		return tokens.reduceRight(reducer, []).reverse();
	};

	state.revealedTokens = setValue(state.revealedTokens);
	state.allRevealedTokens = setValue(state.allRevealedTokens);
};
