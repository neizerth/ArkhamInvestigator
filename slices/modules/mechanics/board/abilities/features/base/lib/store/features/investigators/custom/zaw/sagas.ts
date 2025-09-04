import { spawn } from "redux-saga/effects";
import { AliceLiddelSaga } from "./AliceLiddel/sagas";

export function* AliceInWonderlandSaga() {
	yield spawn(AliceLiddelSaga);
}
