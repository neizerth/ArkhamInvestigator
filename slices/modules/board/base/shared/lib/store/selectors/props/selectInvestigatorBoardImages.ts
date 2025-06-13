import { createSelector } from "@reduxjs/toolkit";
import { prop } from "ramda";
import { selectInvestigatorBoards } from "../../board";

export const selectInvestigatorBoardImages = createSelector(
	[selectInvestigatorBoards],
	(boards) => boards.map(prop("image")),
);
