import {
	type IncreaseBoardValuePropInternalPayload,
	increaseBoardValuePropInternal,
} from "@modules/board/base/shared/lib";
import type { AppThunk, InvestigatorNumericStat as Key } from "@shared/model";
import { selectBoardMaxValue } from "../../../selectors";

export type IncreaseBoardValuePropPayload<K extends Key> = Omit<
	IncreaseBoardValuePropInternalPayload<K>,
	"max"
>;

export const increaseBoardActualPropValue =
	<K extends Key>(payload: IncreaseBoardValuePropPayload<K>): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const max = selectBoardMaxValue(payload)(state);

		dispatch(
			increaseBoardValuePropInternal({
				...payload,
				max,
			}),
		);
	};
