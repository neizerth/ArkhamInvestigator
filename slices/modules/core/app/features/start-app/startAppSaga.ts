import { appStarted } from "@modules/core/app/shared/lib";
import { REHYDRATE } from "redux-persist";
import { put, take } from "redux-saga/effects";

/**
 * `appStarted` fires exactly once, after the persisted state is restored and before
 * `PersistGate` renders the app, so init sagas never race with the UI.
 */
export function* startAppSaga() {
	yield take(REHYDRATE);
	yield put(appStarted());
}
