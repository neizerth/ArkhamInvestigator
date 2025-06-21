import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppActionCreator } from "@shared/model";
import type { PropsWithBoardId } from "../../../model";

type ActionCreator<T> =
	| AppActionCreator<T>
	| ((payload: T) => PayloadAction<T>);

export const withCurrentPayload =
	<Payload extends PropsWithBoardId>(actionCreator: ActionCreator<Payload>) =>
	(payload: Omit<Payload, "boardId">) => {
		const actionPayload = {
			...payload,
			boardId: "current",
		} as Payload;

		return actionCreator(actionPayload);
	};
