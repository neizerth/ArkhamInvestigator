import type {
	BoardDraft,
	InvestigatorBoardValueProp as Key,
} from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	type HandleSetBoardValueOptions,
	handleSetBoardValue,
} from "../handlers";

export type SetBoardValueInternalPayload<K extends Key> = Omit<
	HandleSetBoardValueOptions<K>,
	"state"
>;

export const setBoardValueInternal = <K extends Key>(
	state: BoardDraft,
	{ payload }: PayloadAction<SetBoardValueInternalPayload<K>>,
) => {
	handleSetBoardValue({
		...payload,
		state,
	});
};
