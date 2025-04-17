import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentTurnEnd } from "../turn";
import { selectCurrentIsDefeated } from "./selectCurrentIsDefeated";

export const selectCurrentIsInactive = createSelector(
	[selectCurrentTurnEnd, selectCurrentIsDefeated],
	(turnEnd, defeated) => turnEnd || defeated,
);
