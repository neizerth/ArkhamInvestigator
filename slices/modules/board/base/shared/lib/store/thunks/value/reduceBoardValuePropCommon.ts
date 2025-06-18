import { decreaseBoardValuePropCommon } from "./decreaseBoardValuePropCommon";
import { increaseBoardValuePropCommon } from "./increaseBoardValuePropCommon";
import type { SetBoardPropValuePayload } from "./setBoardPropValue";

import type { InvestigatorNumericStat as Key } from "@shared/model";
import type { AppThunk } from "@shared/model";

export type ReduceBoardValuePropCommonPayload<K extends Key> =
	SetBoardPropValuePayload<K> & {
		max: number;
		min: number;
	};

export const reduceBoardValuePropCommon =
	<K extends Key>(payload: ReduceBoardValuePropCommonPayload<K>): AppThunk =>
	(dispatch) => {
		const { value } = payload;

		if (value === 0) {
			return;
		}

		const absValue = Math.abs(value);

		if (value > 0) {
			dispatch(
				increaseBoardValuePropCommon({
					...payload,
					value: absValue,
				}),
			);
		} else {
			dispatch(
				decreaseBoardValuePropCommon({
					...payload,
					value: absValue,
				}),
			);
		}
	};
