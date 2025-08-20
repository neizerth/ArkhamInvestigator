import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { prop } from "ramda";
import { chaosTokensRevealed } from "../features";

type Options = {
	code: string;
	tokens: ChaosTokenType[];
};

export const createRevealedTokenFilterAction = ({ code, tokens }: Options) => {
	return (action: unknown) => {
		if (!chaosTokensRevealed.match(action)) {
			return false;
		}
		const { payload } = action;

		if (code !== payload.code) {
			return false;
		}

		const revealedTypes = payload.tokens.map(prop("type"));

		return tokens.every((type) => revealedTypes.includes(type));
	};
};
