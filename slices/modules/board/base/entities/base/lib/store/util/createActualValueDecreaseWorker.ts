import { decreaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { InvestigatorNumericStat } from "@shared/model";
import { put } from "redux-saga/effects";
import type { BoardActualPropChangePayload } from "../../../model";

export const createActualValueDecreaseWorker = <
	P extends BoardActualPropChangePayload,
>(
	prop: InvestigatorNumericStat,
) => {
	return function* decreaseActualValueWorker({ payload }: PayloadAction<P>) {
		yield put(
			decreaseBoardActualPropValue({
				...payload,
				prop,
			}),
		);
	};
};
