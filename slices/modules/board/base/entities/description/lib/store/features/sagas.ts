import { fork } from "redux-saga/effects";
import { updateGameTextHeightSaga } from "./updateGameTextSize/updateGameTextSizeSaga";

export function* boardDescriptionSaga() {
	yield fork(updateGameTextHeightSaga);
}
