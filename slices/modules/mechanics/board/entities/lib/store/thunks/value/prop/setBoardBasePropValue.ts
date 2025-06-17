import {
	type CreateBoardPropValueSetterPayload,
	setBoardBasePropValueInternal,
} from "@modules/board/base/shared/lib";
import type { AppThunk, InvestigatorNumericStat as Key } from "@shared/model";

export type SetBoardBasePropValuePayload<K extends Key> = Omit<
	CreateBoardPropValueSetterPayload<K>,
	"min" | "max"
>;

export const setBoardBasePropValue =
	<K extends Key>(payload: SetBoardBasePropValuePayload<K>): AppThunk =>
	(dispatch) => {
		dispatch(
			setBoardBasePropValueInternal({
				...payload,
				min: 0,
				max: Number.POSITIVE_INFINITY,
			}),
		);
	};
