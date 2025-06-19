import type { AppThunk } from "@shared/model";
import { selectBoardValueProp } from "../../selectors/props/selectBoardValueProp";
import {
	type SetBoardPropValueCommonPayload,
	setBoardPropValue,
} from "./setBoardPropValue";

export type DecreaseBoardValuePropCommonPayload =
	SetBoardPropValueCommonPayload;

export const decreaseBoardValueProp =
	(payload: DecreaseBoardValuePropCommonPayload): AppThunk =>
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
