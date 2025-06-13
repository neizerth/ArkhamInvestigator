import type { InvestigatorBoardValueProp as Key } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { SetBoardValuePartInternalPayload } from "../reducers";

export type ChangeBoardValuePartPayload<K extends Key> =
	SetBoardValuePartInternalPayload<K> & {
		code: string;
	};

export const changeBoardValuePart = (<K extends Key>() =>
	createAction<ChangeBoardValuePartPayload<K>>("board/changeValuePart"))();
