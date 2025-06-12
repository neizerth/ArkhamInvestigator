import type { InvestigatorBoardValueProp as Key } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { SetBoardValueInternalPayload } from "../reducers";

export type ChangeBoardValuePayload<K extends Key> =
	SetBoardValueInternalPayload<K> & {
		code: string;
	};

export const changeBoardValue = (<K extends Key>() =>
	createAction<ChangeBoardValuePayload<K>>("board/changeValue"))();
