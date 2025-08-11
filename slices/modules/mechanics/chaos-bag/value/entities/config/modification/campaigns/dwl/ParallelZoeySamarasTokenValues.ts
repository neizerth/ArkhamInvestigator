import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorTokenValueModification } from "../../../../model";

export const ParallelZoeySamarasTokenValues: InvestigatorTokenValueModification =
	{
		[InvesigatorCode.ZoeySamaras.parallel]: ({
			chaosBagContents,
			revealedIds,
		}) => {
			const blessTokensInBag = chaosBagContents.filter(
				(token) =>
					token.type === "bless" &&
					!token.sealed &&
					revealedIds.includes(token.id),
			);

			return {
				elderSign: blessTokensInBag.length,
			};
		},
	};
