import type {
	BoardDraft,
	InvestigatorBoardValueProp as Key,
} from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SetBoardValuePartPayload } from "../../actions";
import { handleSetBoardValuePart } from "../../handlers";

export const setBoardValuePartInternal = <K extends Key>(
	state: BoardDraft,
	{ payload }: PayloadAction<SetBoardValuePartPayload<K>>,
) => {
	handleSetBoardValuePart(state, payload);
};
