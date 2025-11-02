import { increaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { getClues } from "./getClues";

function* worker({ payload }: ReturnType<typeof getClues>) {
	const { boardId, count = 1 } = payload;

	yield put(
		increaseBoardActualPropValue({
			boardId,
			prop: "clues",
			value: count,
		}),
	);
}

export function* getCluesSaga() {
	yield takeEvery(getClues.match, worker);
}
