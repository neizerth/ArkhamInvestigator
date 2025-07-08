import type { InvestigatorBoardUsedAbility } from "@modules/board/abilities/shared/model";
import { InvesigatorCode } from "@shared/config";

export const getDefaultUsedAbilities = (
	code: string,
): InvestigatorBoardUsedAbility[] => {
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
