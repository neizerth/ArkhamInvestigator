import type {
	InvestigatorMainStatType,
	InvestigatorSkillType,
} from "@shared/model";

import type { InvestigatorSignature } from "arkham-investigator-data";

type Stats = Record<InvestigatorMainStatType | InvestigatorSkillType, number>;

export const getSignatureStats = ({
	health,
	sanity,
	skill_agility,
	skill_combat,
	skill_intellect,
	skill_willpower,
}: InvestigatorSignature): Stats => ({
	health,
	sanity,
	agility: skill_agility,
	combat: skill_combat,
	intellect: skill_intellect,
	willpower: skill_willpower,
});
