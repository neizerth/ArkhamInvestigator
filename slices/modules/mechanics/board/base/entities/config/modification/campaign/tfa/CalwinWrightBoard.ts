import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorBoardModification } from "../../../../model";

export const CalwinWrightBoard: InvestigatorBoardModification = {
	[InvesigatorCode.CalvinWright]: ({
		physicalTrauma = 0,
		mentalTrauma = 0,
		investigator,
	}) => {
		return {
			value: {
				willpower: investigator.skill_willpower + mentalTrauma,
				intellect: investigator.skill_intellect + mentalTrauma,

				agility: investigator.skill_agility + physicalTrauma,
				combat: investigator.skill_combat + physicalTrauma,
			},
		};
	},
};
