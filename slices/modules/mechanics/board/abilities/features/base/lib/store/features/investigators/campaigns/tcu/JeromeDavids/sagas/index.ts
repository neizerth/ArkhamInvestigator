import { fork } from "redux-saga/effects";
import { JeromeDavidsElderSignSaga } from "./elderSignSaga";
import { JeromeDavidsProcessModalActionSaga } from "./processModalActionSaga";
import { JeromeDavidsReturnToModalSaga } from "./returnToModalSaga";

export function* JeromeDavidsAbilitySaga() {
	yield fork(JeromeDavidsElderSignSaga);
	yield fork(JeromeDavidsProcessModalActionSaga);
	yield fork(JeromeDavidsReturnToModalSaga);
}
