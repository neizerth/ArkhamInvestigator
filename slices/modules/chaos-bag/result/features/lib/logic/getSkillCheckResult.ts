import type { SkillCheckResult } from "@modules/board/skill-check/shared/model";
import type {
	ChaosBagToken,
	ChaosTokenType,
	ChaosTokenValues,
} from "@modules/chaos-bag/base/shared/model";
import { propEq } from "ramda";

type Options = {
	skillValue: number;
	tokens: ChaosBagToken[];
	tokenValues: ChaosTokenValues;
};

export const getSkillCheckResult = ({
	skillValue,
	tokens,
	tokenValues,
}: Options): SkillCheckResult => {
	const getCount = (type: ChaosTokenType) =>
		tokens.filter(propEq(type, "type")).length;

	const frostCount = getCount("frost");
	const autoFailCount = getCount("autoFail");

	if (autoFailCount > 0) {
		return "fail";
	}

	if (frostCount > 1) {
		return "fail";
	}

	const tokensvalueSum = tokens.reduce((total, { type }) => {
		const value = tokenValues[type] || 0;

		return value + total;
	}, 0);

	const total = Math.max(0, tokensvalueSum + skillValue);

	return total;
};
