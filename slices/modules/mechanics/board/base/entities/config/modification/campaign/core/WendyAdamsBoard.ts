import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import type { InvestigatorBoardModification } from "@modules/mechanics/board/base/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";

const usedAbilities = [{ id: AbilityCode.WendyAdams.base }];

export const WendyAdamsBoard: InvestigatorBoardModification = {
	[InvesigatorCode.WendyAdams.base]: () => ({
		usedAbilities,
		initialUsedAbilities: usedAbilities,
	}),
};
