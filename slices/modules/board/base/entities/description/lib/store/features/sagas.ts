import { fork } from "redux-saga/effects";
import { updateGameTextHeightSaga } from "./updateGameTextHeight/updateGameTextHeightSaga";

export function* boardDescriptionSaga() {
	yield fork(updateGameTextHeightSaga);
}
