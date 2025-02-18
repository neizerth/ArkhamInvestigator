import type { InvestigatorSource, Story } from "../api"
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data"
import type { Nullable } from "../util";

export type Faction = 'neutral' | 'mystic' | 'rogue' | 'survivor' | 'seeker' | 'guardian'

export type SkillType = 'willpower' | 'intellect' | 'combat' | 'agility' | 'wild'

export type SelectedInvestigator = {
  code: string
  variantId: Nullable<string>
  skinId: Nullable<string>
}

export type InvestigatorDetails = {
  investigator: InvestigatorSource
  alternate: InvestigatorDetails[]
  story: Story
  media?: InvestigatorMedia
  is_official: boolean
}