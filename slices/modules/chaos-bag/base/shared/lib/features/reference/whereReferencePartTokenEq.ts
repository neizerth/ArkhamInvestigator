import type { ReferencePart } from "arkham-investigator-data";
import type { ChaosTokenType } from "../../../model";
import { getReferencePartTokens } from "./getReferencePartTokens";

export const whereReferencePartTokenEq =
	(type: ChaosTokenType) => (entry: ReferencePart) =>
		getReferencePartTokens(entry).includes(type);
