import type {
	BoardDraft,
	InvestigatorBoardValueProp as Key,
} from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	type HandleSetBoardValueOptions,
	handleSetBoardValuePart,
} from "../handlers";

export type SetBoardValuePartInternalPayload<K extends Key> = Omit<
	HandleSetBoardValueOptions<K>,
	"state"
>;

export const setBoardValuePartInternal = <K extends Key>(
	state: BoardDraft,
	{ payload }: PayloadAction<SetBoardValuePartInternalPayload<K>>,
) => {
	handleSetBoardValuePart({
		...payload,
		state,
	});
};
