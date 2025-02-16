import type { InvestigatorSource, Story } from "@shared/model"
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data"

export type AvailableInvestigator = {
  investigator: InvestigatorSource
  story: Story
  media?: InvestigatorMedia
}