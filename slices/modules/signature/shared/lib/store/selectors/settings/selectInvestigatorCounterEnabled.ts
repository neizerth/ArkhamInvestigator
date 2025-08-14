import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorSettingsProp } from "./selectInvestigatorSettingsProp";

type Options = {
	code: string;
	abilityId: string;
};
export const selectInvestigatorCounterEnabled = ({
	code,
	abilityId,
}: Options) =>
	createSelector(
		[
			selectInvestigatorSettingsProp({
				code,
				prop: "counters",
			}),
		],
		(counters) => counters?.[abilityId] ?? false,
	);
