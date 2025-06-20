import type {
	ChangeBoardEventPayload,
	InvestigatorBoardValues,
	InvestigatorBoardValueProp as ValueProp,
} from "@modules/board/base/shared/model";
import type { AppThunk, InvestigatorNumericStat } from "@shared/model";
import { createBoardThunk, createCurrentActionCreator } from "../util";
import { setBoardPart } from "./setBoardPart";

export type SetBoardValuePropPartPayload = ChangeBoardEventPayload & {
	prop: InvestigatorNumericStat;
	value?: number;
	baseValue?: number;
	initialValue?: number;
};

type PartialValue = Record<ValueProp, Partial<InvestigatorBoardValues>>;

const boardProps: ValueProp[] = ["value", "baseValue", "initialValue"];

export const setBoardValuePropPartInternal =
	(payload: SetBoardValuePropPartPayload): AppThunk =>
	(dispatch) => {
		const data = boardProps.reduce((target, key) => {
			if (key in payload) {
				data[key] = {
					[key]: payload[key],
				};
			}
			return target;
		}, {} as PartialValue);

		dispatch(
			setBoardPart({
				...payload,
				data,
			}),
		);
	};

export const setBoardValuePropPart = createBoardThunk(
	setBoardValuePropPartInternal,
);

export const setCurrentValuePropPart = createCurrentActionCreator(
	setBoardValuePropPart,
);
