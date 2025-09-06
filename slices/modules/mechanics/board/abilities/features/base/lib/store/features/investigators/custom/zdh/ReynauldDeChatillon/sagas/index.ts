import { fork } from "redux-saga/effects";
import { ReynauldDeChatillonAbilityTriggerSaga } from "./abilityTriggerSaga";
import { ReynauldDeChatillonProcessModalConfirmSaga } from "./processModalSaga";
import { ReynauldDeChatillonProcessReactionSaga } from "./processReactionSaga";

export function* ReynauldDeChatillonAbilitySaga() {
	yield fork(ReynauldDeChatillonAbilityTriggerSaga);
	yield fork(ReynauldDeChatillonProcessModalConfirmSaga);
	yield fork(ReynauldDeChatillonProcessReactionSaga);
}
