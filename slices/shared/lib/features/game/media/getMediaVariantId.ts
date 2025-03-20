import type { InvestigatorVariant } from "arkham-investigator-data";

export const getMediaVariantId = (variant: InvestigatorVariant) => 
  'code' in variant ? variant.code : variant.id;