import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ReferencePart } from "arkham-investigator-data";
import { getReferencePartTokens } from "./getReferencePartTokens";

export const whereReferencePartTokenEq =
	(type: ChaosTokenType) => (entry: ReferencePart) =>
		getReferencePartTokens(entry).includes(type);
