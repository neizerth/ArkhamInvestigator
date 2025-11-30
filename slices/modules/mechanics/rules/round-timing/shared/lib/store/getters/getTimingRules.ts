import type { RulesItemData } from "@modules/mechanics/rules/base/shared/model";
import { whereId } from "@shared/lib";
import { TIMING_RULES_ID } from "../../../config";

type Options = {
	rules: RulesItemData;
};

export const getTimingRules = ({ rules }: Options) => {
	const item = rules.find(whereId(TIMING_RULES_ID));

	const itemRules = item?.rules;

	if (!itemRules) {
		return;
	}
	return itemRules[0];
};
