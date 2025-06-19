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

const withPayload = <K extends BoardKey>(
	payload: K extends BoardKey ? ChangeBoardPropPayload<K> : never,
) => ({ payload });

export const changeBoardProp = createAction("board/changeProp", withPayload);
