import { isBoardExists, selectBoardById } from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import {
	type OpenModalPayload,
	openModal,
} from "@modules/core/modal/shared/base/lib";
import { getBoardFaction } from "@modules/mechanics/board/base/entities/lib";
import { isObject } from "@shared/lib/util";
import type { AppThunk } from "@shared/model";

type OpenBoardModalPayload = OpenModalPayload & PropsWithBoardId;

export function openBoardModal(payload: OpenBoardModalPayload): AppThunk {
	return (dispatch, getState) => {
		const { boardId } = payload;
		const state = getState();
		const board = selectBoardById(boardId)(state);

		if (!isBoardExists(board) || !isObject(payload.data)) {
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
