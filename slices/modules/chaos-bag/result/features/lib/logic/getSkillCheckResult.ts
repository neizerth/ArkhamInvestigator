import type { SkillCheckResult } from "@modules/board/skill-check/shared/model";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { propEq } from "ramda";

type Options = {
	skillValue: number;
	tokens: RevealedChaosBagToken[];
};

export const getSkillCheckResult = ({
	skillValue,
	tokens,
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

	const tokensvalueSum = tokens.reduce((total, { value }) => {
		return value + total;
	}, 0);

	return tokensvalueSum + skillValue;
};
