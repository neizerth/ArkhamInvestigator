import type {
	ChangeBoardEventPayload,
	InvestigatorBoardValueProp,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { InvestigatorNumericStat } from "@shared/model";

export type BoardPropValueChangedPayload = ChangeBoardEventPayload & {
	prop: InvestigatorNumericStat;
	type: InvestigatorBoardValueProp;
	value: number;
	prevValue: number;
};

export const boardPropValueChanged = createAction<BoardPropValueChangedPayload>(
	"board/propValueChanged",
);
