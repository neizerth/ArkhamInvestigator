import type { InvestigatorSource, Story } from "../api"
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data"

export type Faction = 'neutral' | 'mystic' | 'rogue' | 'survivor' | 'seeker' | 'guardian';

export type SelectedInvestigator = {
  code: string
  variantId?: string
  skinId?: string
}


export type InvestigatorDetails = {
  investigator: InvestigatorSource
  story: Story
  media?: InvestigatorMedia
}