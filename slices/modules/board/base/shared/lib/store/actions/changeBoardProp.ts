import type {
	BoardKey,
	ChangeBoardEventPayload,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { SetBoardPropInternalPayload } from "../reducers";

export type ChangeBoardPropPayload<K extends BoardKey> =
	SetBoardPropInternalPayload<K> & ChangeBoardEventPayload;

export const changeBoardProp = (<K extends BoardKey>() =>
	createAction<ChangeBoardPropPayload<K>>("board/changeProp"))();
