import { createSelector } from "@reduxjs/toolkit";
import { selectTurnEnd } from "../../game";
import { selectCurrentIsDefeated } from "./selectCurrentIsDefeated";

export const selectCurrentIsInactive = createSelector(
	[selectTurnEnd("current"), selectCurrentIsDefeated],
	(turnEnd, defeated) => turnEnd || defeated,
);
