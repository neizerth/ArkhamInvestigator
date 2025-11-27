import type { RevealedChaosBagTokenData } from "@modules/chaos-bag/reveal/base/shared/model";
import { isRevealedTokenActive } from "../isRevealedTokenActive";

type Options = {
	tokens: RevealedChaosBagTokenData[];
};

export const isAutoSuccess = ({ tokens }: Options) => {
	return tokens
		.filter(isRevealedTokenActive)
		.some(({ value }) => value === "success");
};
