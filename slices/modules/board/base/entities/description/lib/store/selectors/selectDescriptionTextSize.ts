import type {
	BoardId,
	PropsWithBoardId,
} from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@shared/model";
import { getDescriptionTextSize } from "../../logic";
import { selectDescriptionScale } from "./selectDescriptionScale";

type Options = PropsWithBoardId & {
	unit: number;
};

export const selectDescriptionTextSize =
	({ boardId, unit }: Options) =>
	(state: RootState) =>
		select(state, boardId, unit);

const select = createSelector(
	[
		(state, boardId: BoardId) => selectDescriptionScale(boardId)(state),
		(_, _boardId: BoardId, unit: number) => unit,
	],
	(scale, unit) => {
		return getDescriptionTextSize({
			scale,
			unit,
		});
	},
);
