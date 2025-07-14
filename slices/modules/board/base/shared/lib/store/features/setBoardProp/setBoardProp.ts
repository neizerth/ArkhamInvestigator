import type {
	BoardKey,
	ChangeBoardEventPayload,
	InvestigatorBoard,
	PropsWithBoard,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type SetBoardPropPayload<K extends BoardKey> =
	ChangeBoardEventPayload & {
		prop: K;
		value: InvestigatorBoard[K];
	};

const withPropPayload = <K extends BoardKey>(
	payload: K extends BoardKey ? SetBoardPropPayload<K> : never,
) => ({ payload });

export const setBoardProp = createAction("board/setProp", withPropPayload);

export type BoardPropChangedPayload<K extends BoardKey> =
	SetBoardPropPayload<K> & PropsWithBoard;

const withPropChangePayload = <K extends BoardKey>(
	payload: K extends BoardKey ? BoardPropChangedPayload<K> : never,
) => ({ payload });

export const boardPropChanged = createAction(
	"board/propChanged",
	withPropChangePayload,
);
