import { createSelector } from "@reduxjs/toolkit";
import { selectSignatureSettings } from "../../signature";

export const selectSignatureSettingsByCode = (code: string) =>
	createSelector([selectSignatureSettings], (settings) => {
		return settings?.[code] || {};
	});
