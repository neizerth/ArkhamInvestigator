import { createSelector } from "@reduxjs/toolkit";
import type { SkillCheckResult } from "@shared/model";
import { propEq, sum } from "ramda";
import { numericChaosTokenTypes } from "../../../../../../config/token/types";
import type { ChaosTokenType } from "../../../../../../model";
import {
	selectChaosBagSkillValue,
	selectChaosTokenValue,
} from "../../chaosBag";
import { selectRevealedTokens } from "../reveal";

export const selectSkillCheckResult = createSelector(
	[selectChaosBagSkillValue, selectRevealedTokens, selectChaosTokenValue],
	(skillValue, tokens, specialValueRecord): SkillCheckResult | null => {
		const baseValue = skillValue || 0;
		if (typeof skillValue !== "number") {
			return null;
		}

		const withType = (type: ChaosTokenType) =>
			tokens.filter(propEq(type, "type"));

		const frostTokens = withType("frost");
		const blessTokens = withType("bless");
		const curseTokens = withType("curse");
		const autoFail = withType("autoFail");

		if (autoFail.length > 0) {
			return "fail";
		}

		if (frostTokens.length > 1) {
			return "fail";
		}

		const numericValues = tokens
			.filter((token) => numericChaosTokenTypes.includes(token.type))
			.map((token) => Number.parseInt(token.type) || 0);

		const specialValues = tokens.map((token) =>
			specialValueRecord && token.type in specialValueRecord
				? (specialValueRecord[token.type] ?? 0)
				: 0,
		);

		const specialTokenValue = sum(specialValues);

		const numericTokensValue = sum(numericValues);
		const frostValue = frostTokens.length > 0 ? -1 : 0;
		const blessValue = blessTokens.length * 2;
		const curseValue = curseTokens.length * -2;

		const totalSum = sum([
			baseValue,
			specialTokenValue,
			numericTokensValue,
			frostValue,
			blessValue,
			curseValue,
		]);

		const total = Math.max(0, totalSum);

		return total;
	},
);
