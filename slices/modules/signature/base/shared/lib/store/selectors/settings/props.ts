import type { InvestigatorSettings } from "@modules/signature/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import type { Defined } from "@shared/model";
import { selectSignatureSettingsByCode } from "./selectSignatureSettingsByCode";

type Options<T extends keyof InvestigatorSettings> = {
	prop: T;
	defaultvalue: Defined<InvestigatorSettings[T]>;
};

function createPropSelector<T extends keyof InvestigatorSettings>(
	options: Options<T>,
) {
	return (code: string) =>
		createSelector([selectSignatureSettingsByCode(code)], (settings) => {
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

export const selectSignatureXPByCode = createPropSelector({
	prop: "xp",
	defaultvalue: 0,
});

export const selectSignatureCounters = createPropSelector({
	prop: "counters",
	defaultvalue: {},
});
