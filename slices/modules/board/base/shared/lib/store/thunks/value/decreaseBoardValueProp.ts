import type { AppThunk } from "@shared/model";
import {
	type SetBoardPropValuePayload,
	setBoardPropValue,
} from "../../actions";
import { selectBoardValueProp } from "../../selectors/props/selectBoardValueProp";

export const decreaseBoardValueProp =
	(payload: SetBoardPropValuePayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const currentValue = selectBoardValueProp(payload)(state);

		if (typeof currentValue !== "number") {
			return;
		}
		if (typeof payload.value !== "number") {
			return;
		}

		const value = currentValue - payload.value;

		dispatch(
			setBoardPropValue({
				...payload,
				value,
			}),
		);
	};
