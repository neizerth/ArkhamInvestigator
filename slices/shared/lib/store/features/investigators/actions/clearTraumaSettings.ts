import type { AppThunk } from "@shared/model";
import { omit } from "ramda";
import {
	selectInvestigatorSettings,
	setInvestigatorSettings,
} from "../investigators";

export const clearTraumaSettings = (): AppThunk => (dispatch, getState) => {
	const state = getState();
	const settings = selectInvestigatorSettings(state) || {};

	const codes = Object.keys(settings);

	const data = Object.entries(settings).reduce(
		(target, entry) => {
			const [code, value] = entry;

			target[code] = omit(["physicalTrauma", "mentalTrauma"], value);
			return target;
		},
		{} as typeof settings,
	);

	dispatch(setInvestigatorSettings(data));
};
