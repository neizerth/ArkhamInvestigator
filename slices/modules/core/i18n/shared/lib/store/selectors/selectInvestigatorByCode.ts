import { selectSignatureGroups } from "@shared/lib";
import type { RootState } from "@shared/model";
import { propEq } from "ramda";

export const selectInvestigatorByCode = (code: string) => (state: RootState) =>
	selectSignatureGroups(state).find(propEq(code, "code"));
