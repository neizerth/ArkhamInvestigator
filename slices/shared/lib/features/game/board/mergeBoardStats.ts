import type { InvestigatorBoardValues } from "@shared/model";
import { pick } from "ramda";

type Stats = {
  baseValue: InvestigatorBoardValues
  value: InvestigatorBoardValues
}

export const mergeBoardStats = (
  prev: Stats, 
  stats: InvestigatorBoardValues
): InvestigatorBoardValues => {
  const injury = {
    health: prev.baseValue.health - prev.value.health,
    sanity: prev.baseValue.sanity - prev.value.sanity
  }

  const keepValues = pick([
    'additionalAction',
    'actions',
    'resources',
    'clues'
  ], prev.value)

  return {
    ...stats,
    ...keepValues,
    health: stats.health - injury.health,
    sanity: stats.sanity - injury.sanity,
  }
}