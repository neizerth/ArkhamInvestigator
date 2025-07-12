import { isBoardExists, selectBoardById } from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import {
	type OpenModalPayload,
	openModal,
} from "@modules/core/modal/shared/base/lib";
import type {
	BaseModalAction,
	BaseModalData,
} from "@modules/core/modal/shared/base/model";
import { getBoardFaction } from "@modules/mechanics/board/base/entities/lib";
import type { AppThunk } from "@shared/model";

type OpenBoardModalPayload<
	Action extends BaseModalAction,
	Data extends BaseModalData<Action>,
> = OpenModalPayload<Action, Data> & PropsWithBoardId;

export function openBoardModal<
	Action extends BaseModalAction,
	Data extends BaseModalData<Action>,
>(payload: OpenBoardModalPayload<Action, Data>): AppThunk {
	return (dispatch, getState) => {
		const { boardId } = payload;
		const state = getState();
		const board = selectBoardById(boardId)(state);

		if (!isBoardExists(board)) {
			return;
		}

		const faction = getBoardFaction(board);

		dispatch(
			openModal({
				...payload,
				data: {
					...payload.data,
					faction,
				},
			}),
		);
	};
}
