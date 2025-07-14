import {
	type SetBoardPropValuePayload,
	setBoardPropValue,
} from "../../features";
import { selectBoardValueProp } from "../../selectors/props/selectBoardValueProp";

import type { AppThunk } from "@shared/model";

export type IncreaseBoardValuePropPayload = Omit<
	SetBoardPropValuePayload,
	"value"
> & {
	max?: number;
	value?: number;
};

export const increaseBoardValueProp =
	(payload: IncreaseBoardValuePropPayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const { max = Number.POSITIVE_INFINITY } = payload;
		const currentValue = selectBoardValueProp(payload)(state);

		const increment = payload.value || 1;

		const value = currentValue + increment;

		if (value > max) {
			return;
		}

		dispatch(
			setBoardPropValue({
				...payload,
				value,
			}),
		);
	};
