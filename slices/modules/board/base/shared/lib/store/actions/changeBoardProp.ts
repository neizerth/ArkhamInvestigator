import type {
	BoardKey,
	ChangeBoardEventPayload,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type ChangeBoardPropPayload<K extends BoardKey> =
	ChangeBoardEventPayload & {
		prop: K;
		value: InvestigatorBoard[K];
	};

export const changeBoardProp = (<K extends BoardKey>() =>
	createAction<ChangeBoardPropPayload<K>>("board/changeProp"))();
