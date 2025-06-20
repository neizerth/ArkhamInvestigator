import { selectBoardById, setBoardProp } from "@modules/board/base/shared/lib";
import type { PropsWithBoard } from "@modules/board/base/shared/model";
import type { AppThunk } from "@shared/model";

type Options = PropsWithBoard & {
	id: string;
};

export const toggleSkillCheckHistoryItemPin =
	(payload: Options): AppThunk =>
	(dispatch, getState) => {
		const { boardId, id } = payload;
		const state = getState();
		const board = selectBoardById(boardId)(state);

		if (!board) {
			return;
		}

		const { checkHistory } = board;

		const value = checkHistory.map((item) => {
			if (item.id === id) {
				return {
					...item,
					pinned: !item.pinned,
				};
			}

			return item;
		});

		dispatch(
			setBoardProp({
				boardId,
				prop: "checkHistory",
				value,
			}),
		);
	};
