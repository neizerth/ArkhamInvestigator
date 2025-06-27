import type { ReferencePart } from "arkham-investigator-data";
import { getReferencePartTokens } from "../../../../../effect/entities/lib/getReferencePartTokens";
import type { ChaosTokenType } from "../../../model";

export const whereReferencePartTokenEq =
	(type: ChaosTokenType) => (entry: ReferencePart) =>
		getReferencePartTokens(entry).includes(type);
