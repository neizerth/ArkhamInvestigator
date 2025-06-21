import type { SetBoardPropValuePayload } from "../../actions";
import { decreaseBoardValueProp } from "./decreaseBoardValueProp";
import { increaseBoardValueProp } from "./increaseBoardValueProp";

import type { AppThunk } from "@shared/model";

export type ReduceBoardValuePropPayload = SetBoardPropValuePayload & {
	max: number;
	min: number;
};

export const reduceBoardValueProp =
	(payload: ReduceBoardValuePropPayload): AppThunk =>
	(dispatch) => {
		const { value } = payload;

		if (value === 0) {
			return;
		}

		const absValue = Math.abs(value);

		if (value > 0) {
			dispatch(
				increaseBoardValueProp({
					...payload,
					value: absValue,
				}),
			);
		} else {
			dispatch(
				decreaseBoardValueProp({
					...payload,
					value: absValue,
				}),
			);
		}
	};
