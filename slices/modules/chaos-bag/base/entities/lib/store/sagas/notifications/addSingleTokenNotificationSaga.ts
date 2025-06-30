// TODO
import { takeEvery } from "redux-saga/effects";
import { addChaosToken } from "../../actions";

function* worker({ payload }: ReturnType<typeof addChaosToken>) {}

export function* addSingleTokenNotificationSaga() {
	yield takeEvery(addChaosToken.match, worker);
}
