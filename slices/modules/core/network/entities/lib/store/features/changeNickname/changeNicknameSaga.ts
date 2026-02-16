import { put, select, takeEvery } from "redux-saga/effects";
import { selectNickname, setNickname } from "../../../../../shared/lib";
import { changeNickname, nicknameChanged } from "./changeNickname";

function* worker({ payload }: ReturnType<typeof changeNickname>) {
	const oldValue: ReturnType<typeof selectNickname> =
		yield select(selectNickname);

	yield put(setNickname(payload));

	if (!oldValue) {
		return;
	}

	yield put(nicknameChanged({ oldValue, value: payload }));
}

export function* changeNicknameSaga() {
	yield takeEvery(changeNickname.match, worker);
}
