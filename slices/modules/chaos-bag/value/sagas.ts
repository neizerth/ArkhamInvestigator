import { spawn } from "redux-saga/effects";
import { chaosBagValueEntitiesSaga } from "./entities/lib/store/sagas";

export function* chaosBagValueSaga() {
	yield spawn(chaosBagValueEntitiesSaga);
}
