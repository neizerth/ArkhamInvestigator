import type { AppActionCreator } from "@shared/model";
import type { PropsWithBoard } from "../../../model";

export const createCurrentActionCreator =
	<Payload extends PropsWithBoard>(actionCreator: AppActionCreator<Payload>) =>
	(payload: Omit<Payload, "boardId">) => {
		const actionPayload = {
			...payload,
			boardId: "current",
		} as Payload;

		return actionCreator(actionPayload);
	};
