import { fork } from "redux-saga/effects";
import { BaseSkidsOTooleAddActionSaga } from "./addActionSaga";
import { BaseSkidsOTooleFastAbilityCheckFailedSaga } from "./fastCheckFailedSaga";

export function* BaseSkidsOTooleFastAbilitySaga() {
	yield fork(BaseSkidsOTooleFastAbilityCheckFailedSaga);
	yield fork(BaseSkidsOTooleAddActionSaga);
}
