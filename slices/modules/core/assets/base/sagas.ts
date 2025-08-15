import { spawn } from "redux-saga/effects";
import { assetsEntitiesSaga } from "./entities/sagas";
import { assetsFeaturesSaga } from "./features/sagas";

export function* baseAssetsSaga() {
	yield spawn(assetsEntitiesSaga);
	yield spawn(assetsFeaturesSaga);
}
