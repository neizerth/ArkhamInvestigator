import { spawn } from "redux-saga/effects";
import { checkOutdatedAppSaga } from "./check-outdated-app";
import { rulesSaga } from "./game/rules/lib/store/features/rules/sagas";
import { hideDescriptionSaga } from "./hide-description";
import { loadAppDataSaga } from "./load-app-data/features/sagas";

export function* featuresSaga() {
	yield spawn(checkOutdatedAppSaga);
	yield spawn(hideDescriptionSaga);

	yield spawn(rulesSaga);

	yield spawn(loadAppDataSaga);
}
