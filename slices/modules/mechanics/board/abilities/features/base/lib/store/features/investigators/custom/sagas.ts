import { spawn } from "redux-saga/effects";
import { AliceInWonderlandSaga } from "./zaw/sagas";

export function* customContentInvestigatorAbilitySaga() {
	yield spawn(AliceInWonderlandSaga);
}
