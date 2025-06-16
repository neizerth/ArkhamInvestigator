import { decreaseBoardValuePropInternal } from "./decreaseBoardValuePropInternal";
import { increaseBoardValuePropInternal } from "./increaseBoardValuePropInternal";
import type { SetBoardPropValuePayload } from "./setBoardPropValue";

import type { InvestigatorNumericStat as Key } from "@shared/model";
import type { AppThunk } from "@shared/model";

export type ReduceBoardValuePropInternalPayload<K extends Key> =
	SetBoardPropValuePayload<K> & {
		max: number;
		min: number;
	};

export const reduceBoardValuePropInternal =
	<K extends Key>(payload: ReduceBoardValuePropInternalPayload<K>): AppThunk =>
	(dispatch) => {
		const { value } = payload;

		if (value === 0) {
			return;
		}

		const absValue = Math.abs(value);

		if (value > 0) {
			dispatch(
				increaseBoardValuePropInternal({
					...payload,
					value: absValue,
				}),
			);
		} else {
			dispatch(
				decreaseBoardValuePropInternal({
					...payload,
					value: absValue,
				}),
			);
		}
	};
