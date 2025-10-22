import { spawn } from "redux-saga/effects";
import { openArtworkModalSaga } from "./openArtworkModal/sagas";
import { openThemeModalSaga } from "./openThemeModal/sagas";

export function* themeEntitiesSaga() {
	yield spawn(openThemeModalSaga);
	yield spawn(openArtworkModalSaga);
}
