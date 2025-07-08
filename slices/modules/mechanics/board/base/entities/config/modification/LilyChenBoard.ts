import { AbilityCode } from "@modules/mechanics/board/abilities/entities/config";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorBoardModification } from "../../model";

const usedAbilities = Object.values(AbilityCode.LilyChen).map((id) => ({ id }));

export const LilyChenBoard: InvestigatorBoardModification = {
	[InvesigatorCode.LilyChen]: () => ({
		usedAbilities,
		initialUsedAbilities: usedAbilities,
	}),
};
