import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getDescriptionTextSize } from "../../logic";
import { selectDescriptionScale } from "./selectDescriptionScale";

type Options = PropsWithBoardId & {
	unit: number;
};

export const selectDescriptionTextSize = ({ boardId, unit }: Options) =>
	createSelector([selectDescriptionScale(boardId)], (scale) => {
		return getDescriptionTextSize({
			scale,
			unit,
		});
	});
