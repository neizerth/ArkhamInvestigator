import { spawn } from "redux-saga/effects";
import { rulesSaga } from "./game/rules/lib/store/features/rules/sagas";
import { hideDescriptionSaga } from "./hide-description";

export function* featuresSaga() {
	yield spawn(hideDescriptionSaga);

	yield spawn(rulesSaga);
}
