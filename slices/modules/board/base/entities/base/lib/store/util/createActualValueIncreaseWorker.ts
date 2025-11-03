import {
	type IncreaseBoardValuePropPayload,
	increaseBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { InvestigatorNumericStat } from "@shared/model";
import { put } from "redux-saga/effects";

type Payload = Omit<IncreaseBoardValuePropPayload, "type"> & {
	count?: number;
};

export const createActualValueIncreaseWorker = <P extends Payload>(
	prop: InvestigatorNumericStat,
) => {
	return function* increaseActualValueWorker(action: PayloadAction<P>) {
		const { boardId, count = 1, history } = action.payload;

		yield put(
			increaseBoardActualPropValue({
				boardId,
				prop,
				value: count,
				history,
			}),
		);
	};
};
