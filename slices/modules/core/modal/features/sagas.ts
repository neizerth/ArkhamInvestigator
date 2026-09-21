import { spawn } from "redux-saga/effects";
import { closeModalOnNavigationSaga } from "./close-modal-on-navigation/closeModalOnNavigationSaga";
import { closeModalOnNewGameSaga } from "./close-modal-on-new-game/closeModalOnNewGameSaga";

export function* modalFeaturesSaga() {
	yield spawn(closeModalOnNavigationSaga);
	yield spawn(closeModalOnNewGameSaga);
}
