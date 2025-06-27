import { whereReferencePartTokenEq as tokenEq } from "@modules/chaos-bag/base/shared/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorTokenEffectModification as Modification } from "../../model";

export const JimCulverTokenEffects: Modification = {
	[InvesigatorCode.JimCulver.base]: ({ reference }) => {
		const item = reference.find(tokenEq("skull"));

		if (!item) {
			return [];
		}

		return [
			{
				id: "elderSign",
				type: "single",
				token: "elderSign",
				effect: `<i>[skull]: ${item.effect}</i>`,
			},
		];
	},
	[InvesigatorCode.JimCulver.parallel]: ({ reference }) => {
		const skull = reference.find(tokenEq("skull"));
		const curse = reference.find(tokenEq("curse"));

		if (!skull || !curse) {
			return [];
		}

		const effects = [
			`<i>[skull]: ${skull.effect}</i>`,
			`<i>[curse]: ${curse.effect}</i>`,
		];

		return [
			{
				id: "elderSign",
				type: "single",
				token: "elderSign",
				effect: effects.join("\n"),
			},
		];
	},
};
