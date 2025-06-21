import type {
	ChangeBoardEventPayload,
	InvestigatorBoardValues,
	InvestigatorBoardValueProp as Key,
	PropsWithBoard,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type SetBoardValuePartPayload<K extends Key> =
	ChangeBoardEventPayload & {
		type: K;
		value: Partial<InvestigatorBoardValues>;
	};

const withBoardValuePayload = <K extends Key>(
	payload: K extends Key ? SetBoardValuePartPayload<K> : never,
) => ({ payload });

export const setBoardValuePart = createAction(
	"board/setValuePart",
	withBoardValuePayload,
);

export type BoardValuePartChangedPayload<K extends Key> =
	SetBoardValuePartPayload<K> & PropsWithBoard;

const withBoardValueChangePayload = <K extends Key>(
	payload: K extends Key ? BoardValuePartChangedPayload<K> : never,
) => ({ payload });

export const boardValuePartChanged = createAction(
	"board/valuePartChanged",
	withBoardValueChangePayload,
);
