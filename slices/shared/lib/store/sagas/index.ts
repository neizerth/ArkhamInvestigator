// TODO enable all module sagas
import { spawn } from "redux-saga/effects";
import { boardSagas } from "./board";
import { chaosBagSaga } from "./chaosBag";
import { mechanicsSaga } from "./mechanics";
import { notificationsSaga } from "./notifications";
import { skillCheckSaga } from "./skillCheck";

export default function* rootSaga() {
	yield spawn(boardSagas);
	yield spawn(chaosBagSaga);
	yield spawn(skillCheckSaga);
	yield spawn(mechanicsSaga);
	yield spawn(notificationsSaga);
}
