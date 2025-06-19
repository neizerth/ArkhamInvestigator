import { selectBoardValueProp } from "../../selectors/props/selectBoardValueProp";
import {
	type SetBoardPropValueCommonPayload,
	setBoardPropValue,
} from "./setBoardPropValue";

import type { AppThunk } from "@shared/model";

export const increaseBoardValueProp =
	(payload: SetBoardPropValueCommonPayload): AppThunk =>
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
