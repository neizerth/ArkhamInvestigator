import { spawn } from "redux-saga/effects";
import { boardSaga } from "./board/sagas";
import { chaosBagSaga } from "./chaos-bag/sagas";
import { coreModulesSaga } from "./core/sagas";
import { factionSaga } from "./faction/sagas";
import { gameSaga } from "./game/sagas";
import { mechanicsSaga } from "./mechanics/sagas";
import { signatureSaga } from "./signature/sagas";
import { storiesSaga } from "./stories/sagas";

export function* modulesSaga() {
	yield spawn(coreModulesSaga);

	yield spawn(boardSaga);
	yield spawn(chaosBagSaga);
	yield spawn(mechanicsSaga);
	yield spawn(factionSaga);

	yield spawn(signatureSaga);
	yield spawn(storiesSaga);

	yield spawn(gameSaga);
}
