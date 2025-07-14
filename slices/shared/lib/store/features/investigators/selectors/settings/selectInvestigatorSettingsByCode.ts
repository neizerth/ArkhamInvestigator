import type { RootState } from "@shared/model";
import { selectInvestigatorSettings } from "../../investigators";

export const selectInvestigatorSettingsByCode =
	(code: string) => (state: RootState) => {
		const settings = selectInvestigatorSettings(state);
		return settings?.[code] || {};
	};
