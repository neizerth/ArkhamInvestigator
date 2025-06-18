import { decreaseBoardValueProp } from "./decreaseBoardValueProp";
import { increaseBoardValueProp } from "./increaseBoardValueProp";
import type { SetBoardPropValueCommonPayload } from "./setBoardPropValue";

import type { InvestigatorNumericStat as Key } from "@shared/model";
import type { AppThunk } from "@shared/model";

export type ReduceBoardValuePropCommonPayload<K extends Key> =
	SetBoardPropValueCommonPayload<K> & {
		max: number;
		min: number;
	};

export const reduceBoardValueProp =
	<K extends Key>(payload: ReduceBoardValuePropCommonPayload<K>): AppThunk =>
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
