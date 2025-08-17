import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import type { ChaosBagEffects } from "@modules/chaos-bag/effect/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { defultEffectModificationCallback } from "../../lib/logic";
import type { InvestigatorTokenEffectModification as Modification } from "../../model";

export const WendyAdamsTokenEffects: Modification = {
	[InvesigatorCode.WendyAdams.base]: (options) => {
		const effects = defultEffectModificationCallback(options);
		const { board } = options;
		const [line] = board.investigator.text.split("\n");

		return chaosToken.types.all.reduce((target, type) => {
			const effect = effects[type];
			target[type] = `${effect}\n${line}`;
			return target;
		}, {} as ChaosBagEffects);
	},
};
