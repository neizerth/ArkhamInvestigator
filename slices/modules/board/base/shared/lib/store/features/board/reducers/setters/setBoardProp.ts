import type {
	BoardDraft,
	BoardId,
	BoardKey,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import { handleSetBoardProp } from "../../handlers";

export type SetBoardPropPayload<T extends BoardKey> = {
	prop: T;
	value: InvestigatorBoard[T];
	boardId: BoardId;
};

export const setBoardProp = <K extends BoardKey>(
	state: BoardDraft,
	{ payload }: PayloadAction<SetBoardPropPayload<K>>,
) => {
	const { boardId, prop, value } = payload;

	handleSetBoardProp({
		state,
		boardId,
		prop,
		value,
	});
};
