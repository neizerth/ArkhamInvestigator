import type { AppActionCreator, AppThunk } from "@shared/model";
import type { PropsWithBoard } from "../../../model";

export const createCurrentBoardThunk =
	<Payload extends PropsWithBoard>(actionCreator: AppActionCreator<Payload>) =>
	(payload: Omit<Payload, "boardId">): AppThunk =>
	(dispatch) => {
		const actionPayload = {
			...payload,
			boardId: "current",
		} as Payload;

		dispatch(actionCreator(actionPayload));
	};
