import type {
	BoardDraft,
	InvestigatorBoardStat,
} from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	type HandleSetBoardValuePropOptions,
	handleSetBoardValueProp,
} from "../handlers";

export type SetBoardPropValueInternalPayload<K extends InvestigatorBoardStat> =
	Omit<HandleSetBoardValuePropOptions<K>, "state">;

export const setBoardValuePropInternal = <K extends InvestigatorBoardStat>(
	state: BoardDraft,
	{ payload }: PayloadAction<SetBoardPropValueInternalPayload<K>>,
) => {
	handleSetBoardValueProp({
		...payload,
		state,
	});
};
