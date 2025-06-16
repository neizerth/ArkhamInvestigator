import { selectBoardValueProp } from "../../selectors/props/selectBoardValueProp";
import {
	type SetBoardPropValuePayload,
	setBoardPropValue,
} from "./setBoardPropValue";

import type { InvestigatorNumericStat as Key } from "@shared/model";
import type { AppThunk } from "@shared/model";

export type IncreaseBoardValuePropInternalPayload<K extends Key> =
	SetBoardPropValuePayload<K> & {
		max: number;
	};

export const increaseBoardValuePropInternal =
	<K extends Key>(
		payload: IncreaseBoardValuePropInternalPayload<K>,
	): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const currentValue = selectBoardValueProp(payload)(state);

		if (typeof currentValue !== "number") {
			return;
		}

		const { max } = payload;

		const value = Math.min(max, currentValue + payload.value);

		dispatch(
			setBoardPropValue({
				...payload,
				value,
			}),
		);
	};
