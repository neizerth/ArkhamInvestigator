import type { BoardDraft, BoardKey } from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import { handleSetBoardProp } from "../../../handlers";
import type { SetBoardPropPayload } from "../setBoardProp";

export type SetCurrentBoardPropPayload<K extends BoardKey> = Omit<
	SetBoardPropPayload<K>,
	"boardId"
>;

export const setCurrentBoardProp = <K extends BoardKey>(
	state: BoardDraft,
	{ payload }: PayloadAction<SetCurrentBoardPropPayload<K>>,
) => {
	const { prop, value } = payload;

	handleSetBoardProp({
		state,
		boardId: "current",
		prop,
		value,
	});
};
