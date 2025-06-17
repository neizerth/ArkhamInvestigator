import type { AppActionCreator, AppThunk } from "@shared/model";
import type { PropsWithBoard } from "../../../model";
import { selectBoardCode } from "../selectors";

type PropsWithCode = {
	code: string;
};

type PayloadType = PropsWithCode & PropsWithBoard;

export const createBoardThunk =
	<Payload extends PayloadType>(actionCreator: AppActionCreator<Payload>) =>
	(payload: Omit<Payload, "code">): AppThunk =>
	(dispatch, getState) => {
		const { boardId } = payload;
		const state = getState();
		const code = selectBoardCode(boardId)(state);

		if (!code) {
			return;
		}

		const actionPayload = {
			...payload,
			code,
		} as Payload;

		dispatch(actionCreator(actionPayload));
	};
