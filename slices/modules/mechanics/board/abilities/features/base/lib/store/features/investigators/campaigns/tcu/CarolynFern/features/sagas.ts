import { fork } from "redux-saga/effects";
import { CarolynFernCancelElderSignModalSaga } from "./cancelElderSignModal/cancelElderSignBoardModalSaga";
import { CarolynFernHandleHealModalActionSaga } from "./handleHealModalAction/handleHealBoardModalActionSaga";
import { CarolynFernHealHorrorAbilitySaga } from "./healHorror/healHorrorAbilitySaga";
import { CarolynFernOpenElderSignModalSaga } from "./openElderSignModal/openElderSignModalSaga";

export function* CarolynFernAbilitySaga() {
	yield fork(CarolynFernCancelElderSignModalSaga);
	yield fork(CarolynFernHandleHealModalActionSaga);
	yield fork(CarolynFernHealHorrorAbilitySaga);
	yield fork(CarolynFernOpenElderSignModalSaga);
}
