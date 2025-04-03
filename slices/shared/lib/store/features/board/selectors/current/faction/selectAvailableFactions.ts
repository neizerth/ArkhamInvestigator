import { createSelector } from "@reduxjs/toolkit";
import { equals, reject } from "ramda";
import { selectCurrentBoard } from "../selectCurrentBoard";
import { selectCurrentFaction } from "./selectCurrentFaction";

export const selectAvailableFactions = createSelector(
	[selectCurrentBoard, selectCurrentFaction],
	(board, faction) => {
		const roles = board.details.media?.roles || [];
		return reject(equals(faction), roles);
	},
);
