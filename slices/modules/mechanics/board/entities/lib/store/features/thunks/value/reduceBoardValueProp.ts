import {
	type ReduceBoardValuePropInternalPayload,
	reduceBoardValuePropInternal,
} from "@modules/board/base/shared/lib";
import type { AppThunk, InvestigatorNumericStat as Key } from "@shared/model";
import { selectBoardMaxValue, selectBoardMinValue } from "../../selectors";

export type ReduceBoardValuePropPayload<K extends Key> = Omit<
	ReduceBoardValuePropInternalPayload<K>,
	"max" | "min"
>;

export const reduceBoardValueProp =
	<K extends Key>(payload: ReduceBoardValuePropPayload<K>): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const min = selectBoardMinValue(payload)(state);
		const max = selectBoardMaxValue(payload)(state);

		dispatch(
			reduceBoardValuePropInternal({
				...payload,
				min,
				max,
			}),
		);
	};
