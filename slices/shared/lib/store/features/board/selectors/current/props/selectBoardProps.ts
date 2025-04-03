import { createSelector } from "@reduxjs/toolkit";
import type { InvestigatorBoard } from "@shared/model";
import { pick } from "ramda";
import { selectCurrentBoard } from "../selectCurrentBoard";

export const selectBoardProps = (props: (keyof InvestigatorBoard)[]) =>
	createSelector([selectCurrentBoard], (board) => pick(props, board));
