import { spawn } from "redux-saga/effects";
import { checkOutdatedAppSaga } from "../../../../../features/check-outdated-app";
import { hideDescriptionSaga } from "../../../../../features/hide-description";

export function* featuresSaga() {
	yield spawn(checkOutdatedAppSaga);
	yield spawn(hideDescriptionSaga);
}
