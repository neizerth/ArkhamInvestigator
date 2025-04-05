import { createSelector } from "@reduxjs/toolkit";
import { selectDisabledInvestigators } from "@shared/lib";
import { propEq } from "ramda";
import { selectInvestigatorSelectedCount } from "./selectInvestigatorSelectedCount";

export const selectIsInvestigatorDisabled = (code: string) =>
	createSelector(
		[selectDisabledInvestigators, selectInvestigatorSelectedCount(code)],
		(disabled, count) =>
			count === 0 && disabled.filter(propEq(code, "code")).length > 0,
	);
