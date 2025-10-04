import { spawn } from "redux-saga/effects";
import { storiesEntitiesSaga } from "./entities/sagas";
import { storiesFeaturesSaga } from "./features/sagas";

export function* storiesSaga() {
	yield spawn(storiesEntitiesSaga);
	yield spawn(storiesFeaturesSaga);
}
