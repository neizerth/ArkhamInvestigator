import { getReferencePartTokens } from "@modules/chaos-bag/base/shared/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type {
	InvestigatorReferenceModificationCallback as Callback,
	InvestigatorReferenceModification as Modification,
} from "../../model";

const modificationCallback: Callback = ({ reference }) => {
	const item = reference.find((item) =>
		getReferencePartTokens(item).includes("skull"),
	);

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
};

export const JimCulverTokenEffects: Modification = {
	[InvesigatorCode.JimCulver.base]: modificationCallback,
	[InvesigatorCode.JimCulver.parallel]: modificationCallback,
};
