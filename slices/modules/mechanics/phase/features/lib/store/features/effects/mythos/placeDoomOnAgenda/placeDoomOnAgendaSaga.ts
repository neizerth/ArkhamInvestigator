import { selectDoom, setDoom } from "@modules/board/base/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { placeDoomOnAgenda } from "./placeDoomOnAgenda";

function* worker() {
	const currentDoom: ReturnType<typeof selectDoom> = yield select(selectDoom);
	const doom = currentDoom + 1;

	yield put(setDoom(doom));

	yield put(
		sendNotification({
			remote: true,
			message: "mythos.doom",
			data: {
				doom,
			},
		}),
	);
}

export function* placeDoomOnAgendaSaga() {
	yield takeEvery(placeDoomOnAgenda.match, worker);
}
