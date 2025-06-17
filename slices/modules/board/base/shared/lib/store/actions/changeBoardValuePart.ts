import type {
	ChangeBoardEventPayload,
	InvestigatorBoardValues,
	InvestigatorBoardValueProp as Key,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type ChangeBoardValuePartPayload<K extends Key> =
	ChangeBoardEventPayload & {
		type: K;
		value: Partial<InvestigatorBoardValues>;
	};

export const changeBoardValuePart = (<K extends Key>() =>
	createAction<ChangeBoardValuePartPayload<K>>("board/changeValuePart"))();
