// TODO enable all module sagas
import { skillCheckSharedSaga } from "@modules/board/skill-check/shared/lib/store/sagas";
import { spawn } from "redux-saga/effects";
import { boardSagas } from "./board";
import { chaosBagSaga } from "./chaosBag";
import { mechanicsSaga } from "./mechanics";
import { notificationsSaga } from "./notifications";

export default function* rootSaga() {
	yield spawn(boardSagas);
	yield spawn(chaosBagSaga);

	yield spawn(skillCheckSharedSaga);

	yield spawn(mechanicsSaga);

	yield spawn(notificationsSaga);
}
