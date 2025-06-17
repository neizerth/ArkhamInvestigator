import {
	type CreateBoardPropValueSetterPayload,
	setBoardInitialPropValueInternal,
} from "@modules/board/base/shared/lib";
import type { AppThunk, InvestigatorNumericStat as Key } from "@shared/model";

export type SetBoardInitialPropValuePayload<K extends Key> = Omit<
	CreateBoardPropValueSetterPayload<K>,
	"min" | "max"
>;

export const setBoardInitialPropValue =
	<K extends Key>(payload: SetBoardInitialPropValuePayload<K>): AppThunk =>
	(dispatch) => {
		dispatch(
			setBoardInitialPropValueInternal({
				...payload,
				min: 0,
				max: Number.POSITIVE_INFINITY,
			}),
		);
	};
