import type { RootState } from "@shared/model";
import { propEq } from "ramda";
import { selectSelectedInvestigators } from "../game";

export const selectSelectedInvestigatorByCode =
	(code: string) => (state: RootState) =>
		selectSelectedInvestigators(state).find(propEq(code, "code"));
