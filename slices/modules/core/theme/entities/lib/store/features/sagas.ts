import { spawn } from "redux-saga/effects";
import { openArtworkModalSaga } from "./openArtworkModal/sagas";

export function* themeEntitiesSaga() {
	yield spawn(openArtworkModalSaga);
}
