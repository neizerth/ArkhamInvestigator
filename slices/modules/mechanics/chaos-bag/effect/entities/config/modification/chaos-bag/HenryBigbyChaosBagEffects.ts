import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { ChaosBagEffectModification as Modification } from "../../../model";

export const HenryBigbyChaosBagEffects: Modification = {
	[InvesigatorCode.HenryBigby]: ({ board }) => {
		const [line] = board.investigator.text.split("\n");
		return line;
	},
};
