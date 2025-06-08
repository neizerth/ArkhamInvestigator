import { createSelector } from "@reduxjs/toolkit";
import type { BoardId } from "@shared/model";
import type { ChaosTokenType } from "../../../../../../model";
import { selectChaosBagTokenReference } from "./selectChaosBagTokenReference";

export const selectChaosBagTokenReferenceEffects = (
	boardId: BoardId = "current",
) =>
	createSelector([selectChaosBagTokenReference(boardId)], (reference) => {
		return reference.reduce(
			(acc, entry) => {
				if (entry.type === "single") {
					acc[entry.token] = entry.effect;
					return acc;
				}
				for (const token of entry.tokens) {
					acc[token] = entry.effect;
				}
				return acc;
			},
			{} as Partial<Record<ChaosTokenType, string>>,
		);
	});
