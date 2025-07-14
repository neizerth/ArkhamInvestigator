import type { RootState } from "@shared/model";
import { selectInvestigatorSettingsProp } from "./selectInvestigatorSettingsProp";

export const selectInvestigatorCounterEnabled =
	(code: string, abilityId: string) => (state: RootState) => {
		const counters = selectInvestigatorSettingsProp(code, "counters")(state);
		return counters?.[abilityId] ?? false;
	};
