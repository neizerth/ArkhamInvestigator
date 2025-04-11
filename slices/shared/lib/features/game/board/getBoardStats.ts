import type {
	InvestigatorMainStatType,
	InvestigatorSkillType,
} from "@shared/model";

type Stats = Record<InvestigatorMainStatType | InvestigatorSkillType, number>;

type Options = {
	health: number;
	sanity: number;
	skill_agility: number;
	skill_combat: number;
	skill_intellect: number;
	skill_willpower: number;
};

export const getBoardStats = ({
	health,
	sanity,
	skill_agility,
	skill_combat,
	skill_intellect,
	skill_willpower,
}: Options): Stats => ({
	health,
	sanity,
	agility: skill_agility,
	combat: skill_combat,
	intellect: skill_intellect,
	willpower: skill_willpower,
});
