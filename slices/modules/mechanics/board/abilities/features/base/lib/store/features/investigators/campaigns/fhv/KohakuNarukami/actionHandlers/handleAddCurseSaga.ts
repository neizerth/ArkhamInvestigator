import { addSingleChaosToken } from "@modules/chaos-bag/base/entities/lib";
import {
	createModalActionFilter,
	type modalActionProcessed,
} from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { ActionId } from "../actions";

const filterAction = createModalActionFilter({
	ids: [ActionId.addCurse],
});

function* worker({ payload }: ReturnType<typeof modalActionProcessed>) {
	const { boardId } = payload;

	yield put(
		addSingleChaosToken({
			boardId,
			type: "curse",
		}),
	);
}

export function* handleAddCurseSaga() {
	yield takeEvery(filterAction, worker);
}
