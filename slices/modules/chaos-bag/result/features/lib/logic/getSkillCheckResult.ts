import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { propEq } from "ramda";

type Options = {
	skillValue: number;
	tokens: RevealedChaosBagToken[];
};

export const getSkillCheckResult = ({
	skillValue,
	tokens,
}: Options): ChaosTokenValue => {
	const getCount = (type: ChaosTokenType) =>
		tokens.filter(propEq(type, "type")).length;

	const autoFailCount = getCount("autoFail");

	if (autoFailCount > 0) {
		return "fail";
	}

	const frostCount = getCount("frost");

	if (frostCount > 1) {
		return "fail";
	}

	const containsAutoFail = tokens.some(({ value }) => value === "fail");

	if (containsAutoFail) {
		return "fail";
	}

	const containsAutoSuccess = tokens.some(({ value }) => value === "success");

	if (containsAutoSuccess) {
		return "success";
	}

	const tokensvalueSum = tokens.reduce((total, { value, canceled }) => {
		if (typeof value !== "number" || canceled) {
			return total;
		}
		return value + total;
	}, 0);

	return tokensvalueSum + skillValue;
};
