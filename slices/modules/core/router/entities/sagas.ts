import { spawn } from "redux-saga/effects";
import { goBackSaga } from "./goBack/goBackSaga";
import { goToPageSaga } from "./goToPage/goToPageSaga";
import { replacePageToSaga } from "./replacePageTo/replacePageToSaga";

export function* routerEntitiesSaga() {
	yield spawn(goToPageSaga);
	yield spawn(goBackSaga);
	yield spawn(replacePageToSaga);
}
