import type {
	ChangeBoardEventPayload,
	InvestigatorBoardValues,
	InvestigatorBoardValueProp as Key,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type ChangeBoardValuePartPayload<K extends Key> =
	ChangeBoardEventPayload & {
		type: K;
		value: Partial<InvestigatorBoardValues>;
	};

const withPayload = <K extends Key>(
	payload: K extends Key ? ChangeBoardValuePartPayload<K> : never,
) => ({ payload });

export const changeBoardValuePart = createAction(
	"board/changeValuePart",
	withPayload,
);
