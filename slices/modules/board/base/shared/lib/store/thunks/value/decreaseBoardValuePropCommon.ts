import type { InvestigatorNumericStat as Key } from "@shared/model";
import type { AppThunk } from "@shared/model";
import { selectBoardValueProp } from "../../selectors/props/selectBoardValueProp";
import {
	type SetBoardPropValueCommonPayload,
	setBoardPropValueCommon,
} from "./setBoardPropValueCommon";

export type DecreaseBoardValuePropCommonPayload<K extends Key> =
	SetBoardPropValueCommonPayload<K> & {
		min: number;
	};
export const decreaseBoardValuePropCommon =
	<K extends Key>(payload: DecreaseBoardValuePropCommonPayload<K>): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const currentValue = selectBoardValueProp(payload)(state);

		if (typeof currentValue !== "number") {
			return;
		}

		const { min } = payload;

		const value = currentValue - payload.value;

		if (value < min) {
			return;
		}

		dispatch(
			setBoardPropValueCommon({
				...payload,
				value,
			}),
		);
	};
