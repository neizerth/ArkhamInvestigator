import type { AppActionCreator, AppThunk } from "@shared/model";
import type { InvestigatorBoardValueProp } from "../../../model/board";

type PayloadWithType = {
	type: InvestigatorBoardValueProp;
};

export const createBoardValueThunkCreator =
	<Payload extends PayloadWithType>(actionCreator: AppActionCreator<Payload>) =>
	(type: InvestigatorBoardValueProp) =>
	(payload: Omit<Payload, "type">): AppThunk =>
	(dispatch) => {
		const actionPayload = {
			...payload,
			type,
		} as Payload;
		dispatch(actionCreator(actionPayload));
	};
