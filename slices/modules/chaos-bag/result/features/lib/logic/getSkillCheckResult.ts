import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { propEq } from "ramda";

type Options = {
	skillValue: number;
	tokens: RevealedChaosBagToken[];
};

export const getSkillCheckResult = (options: Options): ChaosTokenValue => {
	const { skillValue } = options;
	const tokens = options.tokens.filter(({ removed }) => !removed);

	// const activeTokens =
	const getCount = (type: ChaosTokenType) =>
		tokens.filter(propEq(type, "type")).length;

	const autoFailCount = getCount("autoFail");
	const frostCount = getCount("frost");
	const containsAutoFail = tokens.some(({ value }) => value === "fail");
	const containsAutoSuccess = tokens.some(({ value }) => value === "success");

	if (autoFailCount > 0) {
		return "fail";
	}

	if (frostCount > 1) {
		return "fail";
	}

	if (containsAutoFail) {
		return "fail";
	}

	if (containsAutoSuccess) {
		return "success";
	}

	const tokensvalueSum = tokens.reduce((total, { value, canceled }) => {
		if (typeof value !== "number" || canceled === true) {
			return total;
		}
		return value + total;
	}, 0);

	return tokensvalueSum + skillValue;
};
