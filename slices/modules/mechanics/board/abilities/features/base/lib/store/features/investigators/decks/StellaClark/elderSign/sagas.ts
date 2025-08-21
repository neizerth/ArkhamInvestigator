import { fork } from "redux-saga/effects";
import { StellaClarkOpenElderSignModalSaga } from "./openElderSignModalSaga";
import { StellaClarkProcessModalActionSaga } from "./processModalActionSaga";
import { StellaClarkReturnToRevealModalSaga } from "./returnToRevealSaga";

export function* StellaClarkElderSignSaga() {
	yield fork(StellaClarkOpenElderSignModalSaga);
	yield fork(StellaClarkProcessModalActionSaga);
	yield fork(StellaClarkReturnToRevealModalSaga);
}
