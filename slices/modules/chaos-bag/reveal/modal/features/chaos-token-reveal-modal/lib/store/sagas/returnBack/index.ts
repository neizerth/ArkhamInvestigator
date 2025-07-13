import { fork } from "redux-saga/effects";
import { returnBackAfterNavigationSaga } from "./returnBackAfterNavigationSaga";
import { returnBackToModalSaga } from "./returnBackToModalSaga";

export function* returnBackSaga() {
	yield fork(returnBackAfterNavigationSaga);
	yield fork(returnBackToModalSaga);
}
