import { selectBoardValueProp } from "../../selectors/props/selectBoardValueProp";
import {
	type SetBoardPropValueCommonPayload,
	setBoardPropValueCommon,
} from "./setBoardPropValueCommon";

import type { InvestigatorNumericStat as Key } from "@shared/model";
import type { AppThunk } from "@shared/model";

export type IncreaseBoardValuePropCommonPayload<K extends Key> =
	SetBoardPropValueCommonPayload<K> & {
		max: number;
	};

export const increaseBoardValuePropCommon =
	<K extends Key>(payload: IncreaseBoardValuePropCommonPayload<K>): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const currentValue = selectBoardValueProp(payload)(state);

		if (typeof currentValue !== "number") {
			return;
		}

		const { max } = payload;

		const value = currentValue + payload.value;

		if (value > max) {
			return;
		}

		dispatch(
			setBoardPropValueCommon({
				...payload,
				value,
			}),
		);
	};
