import { fork } from "redux-saga/effects";
import { openArtworkModalSaga as openModalSaga } from "./openArtworkModalSaga";
import { validateArtworkUrlSaga } from "./validateArtworkUrlSaga";

export function* openArtworkModalSaga() {
	yield fork(openModalSaga);
	yield fork(validateArtworkUrlSaga);
}
