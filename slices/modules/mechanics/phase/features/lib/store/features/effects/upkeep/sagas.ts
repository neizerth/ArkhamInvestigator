import { spawn } from "redux-saga/effects";
import { upkeepActionsSaga } from "./actions/sagas";
import { upkeepResourcesSaga } from "./resources/sagas";

export function* upkeepPhaseSaga() {
	yield spawn(upkeepActionsSaga);
	yield spawn(upkeepResourcesSaga);
}
