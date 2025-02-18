import type { InvestigatorSource } from "@shared/model"

export type InvestigatorDetailItem = {
  id: string
  type: 'custom' | 'parallel' | 'book' | 'skin'
  icon?: string
  name: string
  investigator: InvestigatorSource
}