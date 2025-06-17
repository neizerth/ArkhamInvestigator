import type {
	BoardDraft,
	InvestigatorBoardStat,
} from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	type HandleSetBoardPropValueOptions,
	handleSetBoardPropValue,
} from "../../handlers";

export type SetBoardPropValueInternalPayload<K extends InvestigatorBoardStat> =
	Omit<HandleSetBoardPropValueOptions<K>, "state">;

export const setBoardPropValueInternal = <K extends InvestigatorBoardStat>(
	state: BoardDraft,
	{ payload }: PayloadAction<SetBoardPropValueInternalPayload<K>>,
) => {
	handleSetBoardPropValue({
		...payload,
		state,
	});
};
