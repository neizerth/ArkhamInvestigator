import type { RootState } from "@shared/model";
import { getTimingRules } from "../getters";
import { selectRules } from "../rules";

export const selectTimingRules = (state: RootState) => {
	const rules = selectRules(state) ?? [];

	return getTimingRules({ rules });
};
