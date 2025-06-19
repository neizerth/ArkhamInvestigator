import type { BoardDraft } from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	type HandleSetBoardPropValueOptions,
	handleSetBoardPropValue,
} from "../../handlers";

export type SetBoardPropValueInternalPayload = Omit<
	HandleSetBoardPropValueOptions,
	"state"
>;

export const setBoardPropValueInternal = (
	state: BoardDraft,
	{ payload }: PayloadAction<SetBoardPropValueInternalPayload>,
) => {
	handleSetBoardPropValue({
		...payload,
		state,
	});
};
