import type { AppThunk, InvestigatorSettings } from "@shared/model";
import {
	selectInvestigatorSettings,
	setInvestigatorSettings,
} from "../investigators";

export const setInvestigatorSettingsByCode =
	(code: string, settings: InvestigatorSettings): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const config = selectInvestigatorSettings(state) || {};

		const data = {
			...config,
			[code]: settings,
		};

		dispatch(setInvestigatorSettings(data));
	};
