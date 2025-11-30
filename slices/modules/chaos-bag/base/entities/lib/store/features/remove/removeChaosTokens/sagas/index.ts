import { spawn } from "redux-saga/effects";
import { checkRemoveChaosTokenConfirmSaga } from "./checkRemoveSaga";
import { handleRemoveModalActionSaga } from "./handleRemoveModalActionSaga";
import { handleReturnToSkillTestModalActionSaga } from "./handleReturnToSkillTestModalActionSaga";
import { openRemoveChaosTokenConfirmSaga } from "./openModalSaga";
import { processChaosTokenRemoveSaga } from "./processRemoveSaga";

export function* removeChaosTokensSaga() {
	yield spawn(checkRemoveChaosTokenConfirmSaga);
	yield spawn(handleRemoveModalActionSaga);
	yield spawn(openRemoveChaosTokenConfirmSaga);
	yield spawn(processChaosTokenRemoveSaga);
	yield spawn(handleReturnToSkillTestModalActionSaga);
}
