import { spawn } from "redux-saga/effects";
import { setChaosTokenValueSaga } from "./setChaosTokenValueSaga";
import { updateBoardChaosTokenValueSaga } from "./updateBoardChaosTokenValueSaga";

// TODO
export function* chaosBagValueEntitiesSaga() {
	yield spawn(setChaosTokenValueSaga);
	yield spawn(updateBoardChaosTokenValueSaga);
}
