import type {
	BoardDraft,
	BoardKey,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import { always } from "ramda";
import { handleReduceBoardProp } from "../../../../handlers";
import type { ReduceBoardPropPayload } from "../../prop";

export type SetCurrentPropPayload<K extends BoardKey> = Omit<
	ReduceBoardPropPayload<K>,
	"reducer" | "boardId"
> & {
	value: InvestigatorBoard[K];
};

export const setCurrentBoardProp = <K extends BoardKey>(
	state: BoardDraft,
	{ payload }: PayloadAction<SetCurrentPropPayload<K>>,
) => {
	const { prop, value } = payload;

	handleReduceBoardProp({
		state,
		boardId: "current",
		prop,
		reducer: always(value),
	});
};
