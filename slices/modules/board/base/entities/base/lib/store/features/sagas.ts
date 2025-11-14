import { fork } from "redux-saga/effects";
import { getCluesSaga } from "./getClues/getCluesSaga";
import { getResourcesSaga } from "./getResources/getResourcesSaga";
import { healDamageSaga } from "./healDamage/healDamageSaga";
import { healHorrorSaga } from "./healHorror/healHorrorSaga";
import { spendResourcesSaga } from "./spendResources/spendResourcesSaga";
import { takeDamageSaga } from "./takeDamage/takeDamageSaga";
import { takeHorrorSaga } from "./takeHorror/takeHorrorSaga";

export function* boardBaseEntitiesSaga() {
	yield fork(getCluesSaga);
	yield fork(getResourcesSaga);
	yield fork(spendResourcesSaga);
	yield fork(healDamageSaga);
	yield fork(healHorrorSaga);
	yield fork(takeDamageSaga);
	yield fork(takeHorrorSaga);
}
