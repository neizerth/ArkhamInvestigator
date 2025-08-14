import { whereId } from "@shared/lib";
import type { Defined, RulesItem } from "@shared/model";
import { TIMING_RULES_ID } from "../../../config";

type TimingItem = Defined<RulesItem["rules"]>[number];
type Rules = Defined<TimingItem["rules"]>;

type Options = {
	rules: Rules;
};

export const getTimingRules = ({ rules }: Options) => {
	const item = rules.find(whereId(TIMING_RULES_ID));

	const itemRules = item?.rules;

	if (!itemRules) {
		return;
	}
	return itemRules[0];
};
