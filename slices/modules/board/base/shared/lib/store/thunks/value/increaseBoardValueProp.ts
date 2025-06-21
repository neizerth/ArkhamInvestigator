import {
	type SetBoardPropValuePayload,
	setBoardPropValue,
} from "../../actions";
import { selectBoardValueProp } from "../../selectors/props/selectBoardValueProp";

import type { AppThunk } from "@shared/model";

export const increaseBoardValueProp =
	(payload: SetBoardPropValuePayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const currentValue = selectBoardValueProp(payload)(state);

		if (typeof currentValue !== "number") {
			return;
		}

		const value = currentValue + payload.value;

		dispatch(
			setBoardPropValue({
				...payload,
				value,
			}),
		);
	};
