import { fork } from "redux-saga/effects";
import { handleFatherMateoAdditionalActionModalActionSaga as additionalActionSaga } from "./handleAdditionalAction/handleAdditionalActionSaga";
import { handleFatherMateoCardAndResourceModalActionSaga as cardAndResourceSaga } from "./handleCardAndResource/handleCardAndResourceSaga";
import { openFatherMateoElderSignConfirmSaga as openConfirmSaga } from "./openElderSignConfirm/openElderSignConfirmSaga";
import { watchFatherMateoSkillCheckEndSaga as wathceSkillCheckEnd } from "./wathcSkillCheckEnd/watchSkillCheckEndSaga";

export function* BaseFatherMateoElderSignConfirmSaga() {
	yield fork(openConfirmSaga);
	yield fork(wathceSkillCheckEnd);
	yield fork(cardAndResourceSaga);
	yield fork(additionalActionSaga);
}
