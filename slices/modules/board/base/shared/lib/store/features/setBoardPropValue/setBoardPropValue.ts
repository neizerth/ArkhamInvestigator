import type {
	ChangeBoardEventPayload,
	InvestigatorBoardValueProp,
	PropsWithBoard,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { InvestigatorNumericStat } from "@shared/model";

export type SetBoardPropValuePayload = ChangeBoardEventPayload & {
	prop: InvestigatorNumericStat;
	type: InvestigatorBoardValueProp;
	value: number;
};

export const setBoardPropValue =
	createAction<SetBoardPropValuePayload>("board/setPropValue");

export type BoardPropValueChangedPayload = SetBoardPropValuePayload &
	PropsWithBoard;

export const boardPropValueChanged = createAction<BoardPropValueChangedPayload>(
	"board/propValueChanged",
);
