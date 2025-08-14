import type { InvestigatorSettings } from "@modules/signature/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import type { Defined } from "@shared/model";
import { selectInvestigatorSettingsByCode } from "./selectInvestigatorSettingsByCode";

type Options<T extends keyof InvestigatorSettings> = {
	prop: T;
	defaultvalue: Defined<InvestigatorSettings[T]>;
};

function createPropSelector<T extends keyof InvestigatorSettings>(
	options: Options<T>,
) {
	return (code: string) =>
		createSelector([selectInvestigatorSettingsByCode(code)], (settings) => {
			return settings?.[options.prop] ?? options.defaultvalue;
		});
}

export const selectMentalTraumaByCode = createPropSelector({
	prop: "mentalTrauma",
	defaultvalue: 0,
});

export const selectPhysicalTraumaByCode = createPropSelector({
	prop: "physicalTrauma",
	defaultvalue: 0,
});

export const selectInvestigatorXPByCode = createPropSelector({
	prop: "xp",
	defaultvalue: 0,
});

export const selectInvestigatorCounters = createPropSelector({
	prop: "counters",
	defaultvalue: {},
});
