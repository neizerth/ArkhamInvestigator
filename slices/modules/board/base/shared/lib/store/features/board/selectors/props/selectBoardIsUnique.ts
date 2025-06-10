import { createSelector } from "@reduxjs/toolkit";
import { selectBoardProp } from "./selectBoardProp";

export const selectBoardIsUnique = (boardId: number) =>
	createSelector(
		[
			selectBoardProp({
				boardId,
				prop: "investigator",
			}),
		],
		(investigator) => {
			return !investigator?.multiselect;
		},
	);
