import type { AppThunk, InvestigatorNumericStat as Key } from "@shared/model";
import type { InvestigatorBoardValueProp } from "../../../../model/board";
import {
	type SetBoardPropValuePayload,
	setBoardPropValue,
} from "./setBoardPropValue";

export type CreateBoardPropValueSetterPayload<K extends Key> = Omit<
	SetBoardPropValuePayload<K>,
	"type"
> & {
	min: number;
	max: number;
};

export const createBoardPropValueSetter =
	(type: InvestigatorBoardValueProp) =>
	<K extends Key>(payload: CreateBoardPropValueSetterPayload<K>): AppThunk =>
	(dispatch) => {
		const { value, max, min } = payload;

		if (value > max || value < min) {
			return;
		}

		dispatch(
			setBoardPropValue({
				...payload,
				type,
			}),
		);
	};

export const setBoardActualPropValueInternal =
	createBoardPropValueSetter("value");

export const setBoardBasePropValueInternal =
	createBoardPropValueSetter("baseValue");

export const setBoardInitialPropValueInternal =
	createBoardPropValueSetter("initialValue");
