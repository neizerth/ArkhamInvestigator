import { fork } from "redux-saga/effects";
import { changeBoardSystemBarSaga } from "./changeBoardSystemBarSaga";
import { watchBoardIndexChangeSaga } from "./watchBoardIndexChangeSaga";
import { watchDescriptionShowSaga } from "./watchDescriptionShowSaga";
import { watchRouteChangesSaga } from "./watchRouteChangesSaga";

export function* setBoardSystemBarSaga() {
	yield fork(changeBoardSystemBarSaga);
	yield fork(watchRouteChangesSaga);
	yield fork(watchBoardIndexChangeSaga);
	yield fork(watchDescriptionShowSaga);
}
