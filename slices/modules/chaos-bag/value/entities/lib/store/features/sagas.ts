import { spawn } from "redux-saga/effects";
import { setChaosTokenValueSaga } from "./setChaosTokenValue/setChaosTokenValueSaga";
import { updateBoardChaosTokenValueSaga } from "./updateBoardChaosTokenValue/updateBoardChaosTokenValueSaga";
import { updateCurrentRevealedTokenValueSaga } from "./updateCurrentRevealedTokenValue/updateCurrentRevealedTokenValueSaga";

export function* chaosBagValueEntitiesSaga() {
	yield spawn(setChaosTokenValueSaga);
	yield spawn(updateBoardChaosTokenValueSaga);
	yield spawn(updateCurrentRevealedTokenValueSaga);
}
