import { createAction } from "@reduxjs/toolkit";
import type {
	ChangeBoardEventPayload,
	InvestigatorBoard,
	InvestigatorBoardValueProp,
	InvestigatorBoardValues,
} from "../../../model";

type Data = Omit<Partial<InvestigatorBoard>, InvestigatorBoardValueProp> &
	Partial<Record<InvestigatorBoardValueProp, Partial<InvestigatorBoardValues>>>;

export type ChangeBoardPartPayload = ChangeBoardEventPayload & {
	data: Data;
};

export const changeBoardPart =
	createAction<ChangeBoardPartPayload>("board/changePart");
