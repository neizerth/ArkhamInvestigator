import type { AppThunk, InvestigatorNumericStat as Key } from "@shared/model";
import type { InvestigatorBoardValueProp } from "../../../../model/board";
import {
	type SetBoardPropValueCommonPayload,
	setBoardPropValueCommon,
} from "./setBoardPropValueCommon";

export type CreateBoardPropValueSetterPayload<K extends Key> = Omit<
	SetBoardPropValueCommonPayload<K>,
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
			setBoardPropValueCommon({
				...payload,
				type,
			}),
		);
	};

export const setBoardActualPropValueCommon =
	createBoardPropValueSetter("value");

export const setBoardBasePropValueCommon =
	createBoardPropValueSetter("baseValue");

export const setBoardInitialPropValueCommon =
	createBoardPropValueSetter("initialValue");
