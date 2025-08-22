import { spawn } from "redux-saga/effects";
import { goBackSaga } from "./goBack/goBackSaga";
import { goToPageSaga } from "./goToPage/goToPageSaga";

export function* routerSharedSaga() {
	yield spawn(goToPageSaga);
	yield spawn(goBackSaga);
}
