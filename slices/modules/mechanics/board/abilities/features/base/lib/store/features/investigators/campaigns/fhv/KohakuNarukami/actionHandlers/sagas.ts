import { fork } from "redux-saga/effects";
import { handleAddCurseSaga } from "./handleAddCurseSaga";
import { handleRemoveTokensSaga } from "./handleRemoveTokensSaga";

export function* handleModalActionsSaga() {
	yield fork(handleAddCurseSaga);
	yield fork(handleRemoveTokensSaga);
}
