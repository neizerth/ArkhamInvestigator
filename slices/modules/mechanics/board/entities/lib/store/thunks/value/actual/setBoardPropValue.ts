import {
	type CreateBoardPropValueSetterPayload,
	setBoardActualPropValueInternal,
} from "@modules/board/base/shared/lib";
import type { AppThunk, InvestigatorNumericStat as Key } from "@shared/model";
import { selectBoardMaxValue, selectBoardMinValue } from "../../../selectors";

export type SetBoardPropValuePayload<K extends Key> = Omit<
	CreateBoardPropValueSetterPayload<K>,
	"min" | "max"
>;

export const setBoardPropValue =
	<K extends Key>(payload: SetBoardPropValuePayload<K>): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const min = selectBoardMinValue(payload)(state);
		const max = selectBoardMaxValue(payload)(state);

		dispatch(
			setBoardActualPropValueInternal({
				...payload,
				min,
				max,
			}),
		);
	};
