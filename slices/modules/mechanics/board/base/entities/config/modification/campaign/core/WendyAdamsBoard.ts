import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorBoardModification } from "../../../../model";

const usedAbilities = [{ id: AbilityCode.WendyAdams }];

export const WendyAdamsBoard: InvestigatorBoardModification = {
	[InvesigatorCode.WendyAdams.base]: () => ({
		usedAbilities,
		initialUsedAbilities: usedAbilities,
	}),
};
