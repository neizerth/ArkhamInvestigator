import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import type { InvestigatorBoardModification } from "@modules/mechanics/board/base/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";

export const PrestonFairmontBoard: InvestigatorBoardModification = {
	[InvesigatorCode.PrestonFairmont]: () => ({
		abilityValues: {
			[AbilityCode.PrestonFairmont.familyInheritance]: 4,
		},
	}),
};
