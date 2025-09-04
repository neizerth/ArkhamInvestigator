import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { isAutoFail } from "./auto/isAutoFail";
import { isRevealedTokenActive } from "./isRevealedTokenActive";

type Options = {
	skillValue: number;
	tokens: RevealedChaosBagToken[];
};

export const getSkillCheckResult = (options: Options): number => {
	const { skillValue } = options;
	const tokens = options.tokens.filter(isRevealedTokenActive);

	if (isAutoFail({ tokens })) {
		return 0;
	}

	const sum = tokens.reduce((total, { value, canceled }) => {
		if (typeof value !== "number" || canceled === true) {
			return total;
		}
		return value + total;
	}, 0);

	const total = sum + skillValue;

	return total;
};
