import type { AppActionCreator, AppThunk } from "@shared/model";
import type { PropsWithBoard, PropsWithSourceBoard } from "../../../model";
import { selectBoardCode } from "../selectors";

type PropsWithCode = {
	code: string;
};

type PayloadType = PropsWithCode & PropsWithBoard & PropsWithSourceBoard;

export const createBoardThunk =
	<Payload extends PayloadType>(actionCreator: AppActionCreator<Payload>) =>
	(
		payload: Omit<Payload, "code" | "sourceBoardId"> &
			Partial<PropsWithSourceBoard>,
	): AppThunk =>
	(dispatch, getState) => {
		const { boardId } = payload;
		const state = getState();
		const code = selectBoardCode(boardId)(state);

		if (!code) {
			return;
		}

		const actionPayload = {
			sourceBoardId: payload.boardId,
			...payload,
			code,
		} as Payload;

		dispatch(actionCreator(actionPayload));
	};
