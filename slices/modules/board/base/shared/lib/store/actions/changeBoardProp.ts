import type { BoardKey } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { SetBoardPropInternalPayload } from "../reducers";

export type ChangeBoardPropPayload<K extends BoardKey> =
	SetBoardPropInternalPayload<K> & {
		code: string;
	};

export const changeBoardProp = (<K extends BoardKey>() =>
	createAction<ChangeBoardPropPayload<K>>("board/changeProp"))();
