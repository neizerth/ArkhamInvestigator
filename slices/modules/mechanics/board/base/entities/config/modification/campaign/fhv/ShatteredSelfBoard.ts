import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorBoardModification } from "../../../../model";
import { DEFAULT_HAND_SIZE } from "../../../stat";

const handSize = DEFAULT_HAND_SIZE - 3;
const abilityId = "shattered-self-cards";

export const ShatteredSelfBoard: InvestigatorBoardModification = {
	[InvesigatorCode.ShatteredSelf]: () => {
		const value = 5;

		return {
			baseValue: {
				handSize,
			},
			value: {
				handSize,
				willpower: value,
				intellect: value,
				combat: value,
				agility: value,
			},
			abilityValues: {
				[abilityId]: value,
			},
		};
	},
};
