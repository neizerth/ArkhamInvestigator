import type { InvestigatorNumericStat as Key } from "@shared/model";
import type { AppThunk } from "@shared/model";
import { selectBoardValueProp } from "../../selectors/props/selectBoardValueProp";
import {
	type SetBoardPropValueCommonPayload,
	setBoardPropValue,
} from "./setBoardPropValue";

export type DecreaseBoardValuePropCommonPayload<K extends Key> =
	SetBoardPropValueCommonPayload<K>;

export const decreaseBoardValueProp =
	<K extends Key>(payload: DecreaseBoardValuePropCommonPayload<K>): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const currentValue = selectBoardValueProp(payload)(state);

		if (typeof currentValue !== "number") {
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
