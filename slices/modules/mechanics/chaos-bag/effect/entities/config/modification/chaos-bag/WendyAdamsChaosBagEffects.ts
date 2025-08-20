import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { ChaosBagEffectModification as Modification } from "../../../model";

export const WendyAdamsChaosBagEffects: Modification = {
	[InvesigatorCode.WendyAdams.base]: ({ board }) => {
		const [line] = board.investigator.text.split("\n");

		return line;
	},
};
