import {
	isBoardExists,
	selectBoardById,
	setBoardProp,
	withCurrentPayload,
} from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { AppThunk } from "@shared/model";

type Payload = PropsWithBoardId & {
	id: string;
	title?: string;
};

export const setSkillCheckHistoryItemTitle =
	({ boardId, id, title }: Payload): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardById(boardId)(state);

		if (!isBoardExists(board)) {
			return;
		}

		const { checkHistory } = board;

		const value = checkHistory.map((item) => {
			if (item.id === id) {
				return {
					...item,
					title,
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

export const setCurrentSkillCheckHistoryItemTitle = withCurrentPayload(
	setSkillCheckHistoryItemTitle,
);
