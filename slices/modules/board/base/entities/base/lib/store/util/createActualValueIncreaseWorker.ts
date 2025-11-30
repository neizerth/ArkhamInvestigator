import { increaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { InvestigatorNumericStat } from "@shared/model";
import { put } from "redux-saga/effects";
import type { BoardActualPropChangePayload } from "../../../model";

export const createActualValueIncreaseWorker = <
	P extends BoardActualPropChangePayload,
>(
	prop: InvestigatorNumericStat,
) => {
	return function* increaseActualValueWorker({ payload }: PayloadAction<P>) {
		yield put(
			increaseBoardActualPropValue({
				...payload,
				prop,
			}),
		);
	};
};
