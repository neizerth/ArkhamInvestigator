import type {
	ChangeBoardEventPayload,
	InvestigatorBoardValueProp,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { InvestigatorNumericStat } from "@shared/model";

export type ChangeBoardPropValuePayload = ChangeBoardEventPayload & {
	prop: InvestigatorNumericStat;
	type: InvestigatorBoardValueProp;
	value: number;
};

export const changeBoardPropValue = createAction<ChangeBoardPropValuePayload>(
	"board/changePropValue",
);
