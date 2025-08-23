import { setBoardProp } from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectGameTextHeight } from "../../selectors";
import {
	gameTextHeightUpdated,
	updateGameTextSize,
} from "./updateGameTextSize";

function* worker({ payload }: ReturnType<typeof updateGameTextSize>) {
	const { boardId, value } = payload;
	const heightSelector = selectGameTextHeight(boardId);

	const height: ReturnType<typeof heightSelector> =
		yield select(heightSelector);

	if (height === value.height) {
		return;
	}

	yield put(
		setBoardProp({
			boardId,
			prop: "gameTextSize",
			value,
		}),
	);

	yield put(gameTextHeightUpdated(payload));
}

export function* updateGameTextHeightSaga() {
	yield takeEvery(updateGameTextSize.match, worker);
}
