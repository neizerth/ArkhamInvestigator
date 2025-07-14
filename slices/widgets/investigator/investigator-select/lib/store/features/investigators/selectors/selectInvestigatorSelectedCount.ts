import { selectSelectedInvestigators } from "@shared/lib";
import type { RootState } from "@shared/model";
import { propEq } from "ramda";

export const selectInvestigatorSelectedCount =
	(code: string) => (state: RootState) =>
		selectSelectedInvestigators(state).filter(propEq(code, "code")).length;
