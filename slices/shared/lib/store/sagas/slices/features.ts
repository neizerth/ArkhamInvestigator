import { spawn } from "redux-saga/effects";
import { checkOutdatedAppSaga } from "../../../../../features/check-outdated-app";
import { rulesSaga } from "../../../../../features/game/rules/lib/store/features/rules/sagas";
import { hideDescriptionSaga } from "../../../../../features/hide-description";
import { loadAppDataSaga } from "../../../../../features/load-app-data/features/sagas";

export function* featuresSaga() {
	yield spawn(checkOutdatedAppSaga);
	yield spawn(hideDescriptionSaga);

	yield spawn(rulesSaga);

	yield spawn(loadAppDataSaga);
}
