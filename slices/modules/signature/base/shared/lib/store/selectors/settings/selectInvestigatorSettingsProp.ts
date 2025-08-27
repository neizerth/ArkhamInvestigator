import type { InvestigatorSettings } from "@modules/signature/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorSettingsByCode } from "./selectInvestigatorSettingsByCode";

type Options<T extends keyof InvestigatorSettings> = {
	code: string;
	prop: T;
};

export const selectInvestigatorSettingsProp = <
	T extends keyof InvestigatorSettings,
>({
	code,
	prop,
}: Options<T>) =>
	createSelector([selectInvestigatorSettingsByCode(code)], (settings) => {
		return settings?.[prop];
	});
