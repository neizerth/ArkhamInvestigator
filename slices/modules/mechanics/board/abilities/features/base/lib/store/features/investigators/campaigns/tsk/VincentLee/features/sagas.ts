import { fork } from "redux-saga/effects";
import { VincentLeeCancelElderSignModalSaga } from "./cancelElderSignModal/cancelElderSignBoardModalSaga";
import { VincentLeeHandleHealModalActionSaga } from "./handleHealModalAction/handleHealBoardModalActionSaga";
import { VincentLeeHealDamageAbilitySaga } from "./healDamage/healDamageAbilitySaga";
import { VincentLeeOpenElderSignModalSaga } from "./openElderSignModal/openElderSignModalSaga";

export function* VincentLeeAbilitySaga() {
	yield fork(VincentLeeCancelElderSignModalSaga);
	yield fork(VincentLeeHandleHealModalActionSaga);
	yield fork(VincentLeeHealDamageAbilitySaga);
	yield fork(VincentLeeOpenElderSignModalSaga);
}
