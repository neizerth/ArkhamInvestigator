import { increaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { removeMultipleChaosTokensByType as removeTokens } from "@modules/chaos-bag/base/entities/lib";
import {
	createModalActionFilter,
	type modalActionProcessed,
} from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { ActionId } from "../actions";

const filterAction = createModalActionFilter({
	ids: [ActionId.removeTokens],
});

function* worker({ payload }: ReturnType<typeof modalActionProcessed>) {
	const { boardId } = payload;

	yield put(
		removeTokens({
			boardId,
			type: "bless",
			count: 2,
		}),
	);
	yield put(
		removeTokens({
			boardId,
			type: "curse",
			count: 2,
		}),
	);

	yield put(
		increaseBoardActualPropValue({
			boardId,
			prop: "actions",
		}),
	);
}

export function* handleRemoveTokensSaga() {
	yield takeEvery(filterAction, worker);
}
