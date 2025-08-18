import { fork } from "redux-saga/effects";
import { cancelElderSignModalSaga } from "./cancelElderSignModal/cancelElderSignBoardModalSaga";
import { handleHealModalActionSaga } from "./handleHealModalAction/handleHealBoardModalActionSaga";
import { healHorrorAbilitySaga } from "./healHorror/healHorrorAbilitySaga";
import { openElderSignModalSaga } from "./openElderSignModal/openElderSignModalSaga";

export function* CarolynFernAbilitySaga() {
	yield fork(cancelElderSignModalSaga);
	yield fork(handleHealModalActionSaga);
	yield fork(healHorrorAbilitySaga);
	yield fork(openElderSignModalSaga);
}
