import { createSelector } from "@reduxjs/toolkit";
import { identity, propEq } from "ramda";
import { numericChaosTokenTypes } from "../../../../../../config/token/types";
import type { ChaosTokenType } from "../../../../../../model";
import {
	selectChaosBagSkillCheckType,
	selectChaosBagSkillValue,
} from "../../chaosBag";
import { selectRevealedTokens } from "../reveal";

const numericTypes = numericChaosTokenTypes as unknown as ChaosTokenType[];

export const selectSkillCheckResult = createSelector(
	[
		selectChaosBagSkillValue,
		selectRevealedTokens,
		selectChaosBagSkillCheckType,
	],
	(baseValue, tokens, skillCheckType) => {
		if (!skillCheckType) {
			return baseValue;
		}

		const withType = (type: ChaosTokenType) =>
			tokens.filter(propEq(type, "type"));

		const frostTokens = withType("frost");
		const blessTokens = withType("bless");
		const curseTokens = withType("curse");
		const autoFail = withType("autoFail");

		if (autoFail.length > 0) {
			return 0;
		}

		if (frostTokens.length > 1) {
			return 0;
		}

		const numericTokens = tokens
			.filter((token) => numericTypes.includes(token.type))
			.map((token) => Number.parseInt(token.type))
			.filter(identity);

		const numericTokensValue = numericTokens.reduce(
			(acc, value) => acc + value,
			0,
		);
		const frostValue = frostTokens.length > 0 ? -1 : 0;
		const blessValue = blessTokens.length * 2;
		const curseValue = curseTokens.length * -2;

		return Math.max(
			0,
			(baseValue ?? 0) +
				numericTokensValue +
				frostValue +
				blessValue +
				curseValue,
		);
	},
);
