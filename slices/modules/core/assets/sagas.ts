import { spawn } from "redux-saga/effects";
import { baseAssetsSaga } from "./base/sagas";

export function* assetsSaga() {
	yield spawn(baseAssetsSaga);
}
