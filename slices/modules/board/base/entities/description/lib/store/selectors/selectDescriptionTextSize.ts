import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getDescriptionTextSize } from "../../logic";
import { selectShowSmallDescription } from "./selectShowSmallDescription";

type Options = PropsWithBoardId & {
	unit: number;
};

export const selectDescriptionTextSize = ({ boardId, unit }: Options) =>
	createSelector([selectShowSmallDescription(boardId)], (small) => {
		return getDescriptionTextSize({
			small,
			unit,
		});
	});
