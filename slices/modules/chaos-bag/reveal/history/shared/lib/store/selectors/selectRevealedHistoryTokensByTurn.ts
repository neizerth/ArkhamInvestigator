import { createSelector } from "@reduxjs/toolkit";
import { prop } from "ramda";
import { selectRevealHistory } from "../chaosBagRevealHistory";

export const selectRevealedHistoryTokensByTurn = (turnId: string) => {
	return createSelector([selectRevealHistory], (history) => {
		return history
			.filter((item) => item.turnId === turnId)
			.flatMap(prop("tokens"));
	});
};
