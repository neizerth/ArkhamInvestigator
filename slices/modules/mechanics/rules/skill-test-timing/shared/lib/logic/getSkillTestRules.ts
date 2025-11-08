import { whereId } from "@shared/lib";
import { SKILL_TEST_APPENDIX_ID, SKILL_TEST_RULES_ID } from "../../config";

import type { Defined, RulesItem } from "@shared/model";

type TimingItem = Defined<RulesItem["rules"]>[number];
type Rule = Defined<TimingItem["rules"]>[number];
type Data = Defined<Rule["rules"]>;

export const getSkillTestRules = (data: Data) => {
	const item = data.find(whereId(SKILL_TEST_APPENDIX_ID));

	const rules = item?.rules;

	if (!rules) {
		return;
	}
	return rules.find(whereId(SKILL_TEST_RULES_ID));
};
