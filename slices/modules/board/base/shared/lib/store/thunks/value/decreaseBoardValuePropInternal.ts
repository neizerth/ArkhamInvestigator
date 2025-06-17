import type { InvestigatorNumericStat as Key } from "@shared/model";
import type { AppThunk } from "@shared/model";
import { selectBoardValueProp } from "../../selectors/props/selectBoardValueProp";
import {
	type SetBoardPropValuePayload,
	setBoardPropValue,
} from "./setBoardPropValue";

export type DecreaseBoardValuePropInternalPayload<K extends Key> =
	SetBoardPropValuePayload<K> & {
		min: number;
	};
export const decreaseBoardValuePropInternal =
	<K extends Key>(
		payload: DecreaseBoardValuePropInternalPayload<K>,
	): AppThunk =>
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
			setBoardPropValue({
				...payload,
				value,
			}),
		);
	};
