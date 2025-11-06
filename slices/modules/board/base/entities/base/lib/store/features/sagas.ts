import { fork } from "redux-saga/effects";
import { getCluesSaga } from "./getClues/getCluesSaga";
import { getResourcesSaga } from "./getResources/getResourcesSaga";
import { healDamageSaga } from "./healDamage/healDamageSaga";
import { healHorrorSaga } from "./healHorror/healHorrorSaga";
import { spendResourcesSaga } from "./spendResources/spendResourcesSaga";

export function* boardBaseEntitiesSaga() {
	yield fork(getCluesSaga);
	yield fork(getResourcesSaga);
	yield fork(spendResourcesSaga);
	yield fork(healDamageSaga);
	yield fork(healHorrorSaga);
}
