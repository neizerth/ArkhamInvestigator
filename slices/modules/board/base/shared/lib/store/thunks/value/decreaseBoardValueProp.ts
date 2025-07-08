import type { AppThunk } from "@shared/model";
import {
	type SetBoardPropValuePayload,
	setBoardPropValue,
} from "../../actions";
import { selectBoardValueProp } from "../../selectors/props/selectBoardValueProp";

export type DecreaseBoardValuePropPayload = Omit<
	SetBoardPropValuePayload,
	"value"
> & {
	min?: number;
	value?: number;
};

export const decreaseBoardValueProp =
	(payload: DecreaseBoardValuePropPayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const { min = Number.NEGATIVE_INFINITY } = payload;
		const currentValue = selectBoardValueProp(payload)(state);
		const decrement = payload.value || 1;
		const value = currentValue - decrement;

		if (value < min) {
			return;
		}

		dispatch(
			setBoardPropValue({
				...payload,
				value,
			}),
		);
	};
