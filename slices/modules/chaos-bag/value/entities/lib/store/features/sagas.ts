import { spawn } from "redux-saga/effects";
import { setChaosTokenValueSaga } from "./setChaosTokenValue/setChaosTokenValueSaga";
import { updateBoardChaosTokenValueSaga } from "./updateBoardChaosTokenValue/updateBoardChaosTokenValueSaga";

// TODO
export function* chaosBagValueEntitiesSaga() {
	yield spawn(setChaosTokenValueSaga);
	yield spawn(updateBoardChaosTokenValueSaga);
}
