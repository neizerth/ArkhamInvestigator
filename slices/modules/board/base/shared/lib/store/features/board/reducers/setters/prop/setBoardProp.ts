import type {
	BoardDraft,
	BoardKey,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import { always } from "ramda";
import { handleReduceBoardProp } from "../../../handlers/core/handleReduceBoardProp";
import type { ReduceBoardPropPayload } from "./reduceBoardProp";

export type SetBoardPropPayload<K extends BoardKey> = Omit<
	ReduceBoardPropPayload<K>,
	"reducer"
> & {
	value: InvestigatorBoard[K];
};

export const setBoardProp = <K extends BoardKey>(
	state: BoardDraft,
	{ payload }: PayloadAction<SetBoardPropPayload<K>>,
) => {
	const { value } = payload;

	handleReduceBoardProp({
		...payload,
		state,
		reducer: always(value),
	});
};
