import {
	type ReduceBoardValuePropCommonPayload,
	reduceBoardValuePropCommon,
} from "@modules/board/base/shared/lib";
import type { AppThunk, InvestigatorNumericStat as Key } from "@shared/model";
import { selectBoardMaxValue, selectBoardMinValue } from "../../../selectors";

export type ReduceBoardActualPropValuePayload<K extends Key> = Omit<
	ReduceBoardValuePropCommonPayload<K>,
	"max" | "min"
>;

export const reduceBoardActualPropValue =
	<K extends Key>(payload: ReduceBoardActualPropValuePayload<K>): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const min = selectBoardMinValue(payload)(state);
		const max = selectBoardMaxValue(payload)(state);

		dispatch(
			reduceBoardValuePropCommon({
				...payload,
				min,
				max,
			}),
		);
	};
