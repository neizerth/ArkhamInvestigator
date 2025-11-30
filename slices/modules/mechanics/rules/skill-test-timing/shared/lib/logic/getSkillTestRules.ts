import type { RulesItemData } from "@modules/mechanics/rules/base/shared/model";
import { whereId } from "@shared/lib";
import { SKILL_TEST_APPENDIX_ID, SKILL_TEST_RULES_ID } from "../../config";

export const getSkillTestRules = (data: RulesItemData) => {
	const item = data.find(whereId(SKILL_TEST_APPENDIX_ID));

	const rules = item?.rules;

	if (!rules) {
		return;
	}
	return rules.find(whereId(SKILL_TEST_RULES_ID));
};
