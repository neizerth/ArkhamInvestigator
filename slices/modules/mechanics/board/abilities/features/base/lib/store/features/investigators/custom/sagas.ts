import { spawn } from "redux-saga/effects";
import { AliceInWonderlandSaga } from "./zaw/sagas";
import { DarkestDungeonSaga } from "./zdh/sagas";

export function* customContentInvestigatorAbilitySaga() {
	yield spawn(AliceInWonderlandSaga);
	yield spawn(DarkestDungeonSaga);
}
