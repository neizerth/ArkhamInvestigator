import { InvesigatorCode } from "@shared/config";
import type { UsedAbility } from "@shared/model";

export const getDefaultUsedAbilities = (code: string): UsedAbility[] => {
	if (code === InvesigatorCode.LilyChen) {
		return [
			{
				id: "alignment-of-spirit",
			},
			{
				id: "quiescence-of-thought",
			},
			{
				id: "prescience-of-fate",
			},
			{
				id: "balance-of-body",
			},
		];
	}
	return [];
};
