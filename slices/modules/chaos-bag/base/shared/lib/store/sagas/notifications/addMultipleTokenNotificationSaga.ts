// TODO
import { takeEvery } from "redux-saga/effects";
import { addMultipleChaosTokens } from "../../actions";

function* worker({ payload }: ReturnType<typeof addMultipleChaosTokens>) {}

export function* addMultipleTokenNotificationSaga() {
	yield takeEvery(addMultipleChaosTokens.match, worker);
}
