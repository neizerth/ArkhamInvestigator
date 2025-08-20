import { LilyChenAbilityCodes } from "@modules/mechanics/board/abilities/shared/config";
import type { InvestigatorBoardModification } from "@modules/mechanics/board/base/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";

const usedAbilities = LilyChenAbilityCodes.map((id) => ({ id }));

export const LilyChenBoard: InvestigatorBoardModification = {
	[InvesigatorCode.LilyChen]: () => ({
		usedAbilities,
		initialUsedAbilities: usedAbilities,
	}),
};
