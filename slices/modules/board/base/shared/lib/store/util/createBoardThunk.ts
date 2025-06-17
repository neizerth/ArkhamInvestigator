import type { PayloadActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/model";
import type { PropsWithBoard } from "../../../model";
import { selectBoardCode } from "../selectors";

type PropsWithCode = {
	code: string;
};

type ActionPayload = PropsWithBoard & PropsWithCode;
type InputThunk<P> = (payload: P) => AppThunk;

type InputAction<P> = PayloadActionCreator<P>;

type Input<P> = InputThunk<P> | InputAction<P>;

export const createBoardThunk =
	<Payload extends ActionPayload>(input: Input<Payload>) =>
	<T extends Omit<Payload, "code">>(payload: T): AppThunk =>
	(dispatch, getState) => {
		const { boardId } = payload;
		const state = getState();
		const code = selectBoardCode(boardId)(state);

		if (!code) {
			return;
		}

		dispatch(
			input({
				...payload,
				code,
			}),
		);
	};
