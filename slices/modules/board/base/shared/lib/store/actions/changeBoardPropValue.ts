import type {
	ChangeBoardEventPayload,
	InvestigatorBoardValueProp,
	InvestigatorBoardValues,
	InvestigatorBoardStat as Key,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type ChangeBoardPropValuePayload<K extends Key> =
	ChangeBoardEventPayload & {
		prop: K;
		type: InvestigatorBoardValueProp;
		value: InvestigatorBoardValues[K];
	};

export const changeBoardPropValue = (<K extends Key>() =>
	createAction<ChangeBoardPropValuePayload<K>>("board/changePropValue"))();
