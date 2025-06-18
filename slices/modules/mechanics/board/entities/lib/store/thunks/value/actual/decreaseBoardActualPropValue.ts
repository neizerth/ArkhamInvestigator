import {
	type DecreaseBoardValuePropCommonPayload,
	decreaseBoardValuePropCommon,
} from "@modules/board/base/shared/lib";
import type { AppThunk, InvestigatorNumericStat as Key } from "@shared/model";
import { selectBoardMinValue } from "../../../selectors";

export type DecreaseBoardValuePropPayload<K extends Key> = Omit<
	DecreaseBoardValuePropCommonPayload<K>,
	"min"
>;

export const decreaseBoardActualPropValue =
	<K extends Key>(payload: DecreaseBoardValuePropPayload<K>): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const min = selectBoardMinValue(payload)(state);

		dispatch(
			decreaseBoardValuePropCommon({
				...payload,
				min,
			}),
		);
	};
