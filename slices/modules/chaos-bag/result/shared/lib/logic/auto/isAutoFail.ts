import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { propEq } from "ramda";
import { isRevealedTokenActive } from "../isRevealedTokenActive";

type Options = {
	tokens: RevealedChaosBagToken[];
};

export const isAutoFail = ({ tokens }: Options) => {
	const containsAutoFail = tokens
		.filter(isRevealedTokenActive)
		.some(({ value }) => value === "fail");

	if (containsAutoFail) {
		return true;
	}
	const frostCount = tokens.filter(propEq("frost", "type")).length;

	return frostCount > 1;
};
