import type { InvestigatorSource } from "@shared/model";

export const getBoardStats = ({
  health,
  sanity,
  skill_agility,
  skill_combat,
  skill_intellect,
  skill_willpower
}: InvestigatorSource) => ({
  health,
  sanity,
  agility: skill_agility,
  combat: skill_combat,
  intellect: skill_intellect,
  willpower: skill_willpower
})