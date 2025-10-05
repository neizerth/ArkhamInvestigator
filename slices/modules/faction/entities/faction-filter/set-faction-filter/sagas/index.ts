import { fork } from "redux-saga/effects";
import { setFactionFilterSaga as setFilterSaga } from "./setFactionFilterSaga";
import { setSpoilerFilterTypeSaga } from "./setSpoilerFilterTypeSaga";

export function* setFactionFilterSaga() {
	yield fork(setFilterSaga);
	yield fork(setSpoilerFilterTypeSaga);
}
