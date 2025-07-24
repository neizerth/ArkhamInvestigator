import { increaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { addChaosToken } from "@modules/chaos-bag/base/entities/lib";
import {
	createModalActionFilter,
	type modalActionProcessed,
} from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { ActionId } from "../actions";

const filterAction = createModalActionFilter({
	ids: [ActionId.addBless],
});

function* worker({ payload }: ReturnType<typeof modalActionProcessed>) {
	const { boardId } = payload;

	yield put(
		addChaosToken({
			boardId,
			type: "bless",
		}),
	);
	yield put(
		increaseBoardActualPropValue({
			boardId,
			prop: "actions",
		}),
	);
}

export function* handleAddBlessSaga() {
	yield takeEvery(filterAction, worker);
}
