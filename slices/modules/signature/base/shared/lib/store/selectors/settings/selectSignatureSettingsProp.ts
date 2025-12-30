import type { InvestigatorSettings } from "@modules/signature/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectSignatureSettingsByCode } from "./selectSignatureSettingsByCode";

type Options<T extends keyof InvestigatorSettings> = {
	code: string;
	prop: T;
};

export const selectSignatureSettingsProp = <
	T extends keyof InvestigatorSettings,
>({
	code,
	prop,
}: Options<T>) =>
	createSelector([selectSignatureSettingsByCode(code)], (settings) => {
		return settings?.[prop];
	});
