import { spawn } from "redux-saga/effects";
import { closeModalOnNavigationSaga } from "./close-modal-on-navigation/closeModalOnNavigationSaga";
import { initModalSaga } from "./init-modal/initModalSaga";

export function* modalFeaturesSaga() {
	yield spawn(closeModalOnNavigationSaga);
	yield spawn(initModalSaga);
}
