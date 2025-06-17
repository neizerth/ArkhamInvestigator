import { selectBoardCode } from "@modules/board/base/shared/lib";
import type { AppThunk } from "@shared/model";
import { type ChangeBoardPartPayload, changeBoardPart } from "../actions";

export type SetBoardPartPayload = Omit<ChangeBoardPartPayload, "code">;

export const setBoardPart =
	(options: SetBoardPartPayload): AppThunk =>
	(dispatch, getState) => {
		const { boardId } = options;
		const state = getState();
		const code = selectBoardCode(boardId)(state);

		if (!code) {
			return;
		}

		dispatch(
			changeBoardPart({
				...options,
				code,
			}),
		);
	};
