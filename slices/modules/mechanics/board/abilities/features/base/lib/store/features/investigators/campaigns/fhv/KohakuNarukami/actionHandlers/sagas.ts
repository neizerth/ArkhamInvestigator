import { fork } from "redux-saga/effects";
import { handleAddBlessSaga } from "./handleAddBlessSaga";
import { handleAddCurseSaga } from "./handleAddCurseSaga";
import { handleRemoveTokensSaga } from "./handleRemoveTokensSaga";

export function* handleModalActionsSaga() {
	yield fork(handleAddCurseSaga);
	yield fork(handleAddBlessSaga);
	yield fork(handleRemoveTokensSaga);
}
