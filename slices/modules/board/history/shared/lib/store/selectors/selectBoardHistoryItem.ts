import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib";

type Options = PropsWithBoardId & {
	id: string;
};

export const selectBoardHistoryItem = ({ boardId, id }: Options) =>
	createSelector(
		[
			selectBoardProp({
				boardId,
				prop: "history",
			}),
		],
		(history) => {
			const data = history || [];

			return data.find(whereId(id));
		},
	);
