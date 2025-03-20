import type { InvestigatorMainStatType, InvestigatorSkillType, InvestigatorSource } from "@shared/model";


type Stats = Record<InvestigatorMainStatType | InvestigatorSkillType, number>;

export const getBoardStats = ({
  health,
  sanity,
  skill_agility,
  skill_combat,
  skill_intellect,
  skill_willpower
}: InvestigatorSource): Stats => ({
  health,
  sanity,
  agility: skill_agility,
  combat: skill_combat,
  intellect: skill_intellect,
  willpower: skill_willpower
})