import type {
	ChangeBoardEventPayload,
	InvestigatorBoardStat as Key,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { SetBoardPropValueInternalPayload } from "../reducers";

export type ChangeBoardPropValuePayload<K extends Key> =
	SetBoardPropValueInternalPayload<K> & ChangeBoardEventPayload;

export const changeBoardPropValue = (<K extends Key>() =>
	createAction<ChangeBoardPropValuePayload<K>>("board/changePropValue"))();
