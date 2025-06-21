import { getReferencePartTokens } from "@features/game/chaos-bag";
import { createSelector } from "@reduxjs/toolkit";
import { selectReferenceCardTokens } from "@shared/lib";
import type { ReferencePart } from "arkham-investigator-data";

export const selectJimCulverReferenceModification = createSelector(
	[selectReferenceCardTokens],
	(reference): ReferencePart[] => {
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
	},
);
