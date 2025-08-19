import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { includeChaosTokenInResult } from "./includeChaosTokenInResult";
import { isAutoFail } from "./isAutoFail";

type Options = {
	skillValue: number;
	tokens: RevealedChaosBagToken[];
};

export const getSkillCheckResult = (options: Options): number => {
	const { skillValue } = options;
	const tokens = options.tokens.filter(includeChaosTokenInResult);

	if (isAutoFail({ tokens })) {
		return 0;
	}

	const sum = tokens.reduce((total, { value, canceled }) => {
		if (typeof value !== "number" || canceled === true) {
			return total;
		}
		return value + total;
	}, 0);

	return sum + skillValue;
};
