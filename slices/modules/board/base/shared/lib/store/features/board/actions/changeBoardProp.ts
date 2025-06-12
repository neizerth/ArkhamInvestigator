import type { SetBoardPropInternalPayload } from "@modules/board/base/shared/lib/store/features/board/reducers";
import type { BoardKey } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type ChangeBoardPropPayload<K extends BoardKey> =
	SetBoardPropInternalPayload<K> & {
		code: string;
	};

export const changeBoardProp = (<K extends BoardKey>() =>
	createAction<ChangeBoardPropPayload<K>>("board/changeProp"))();
