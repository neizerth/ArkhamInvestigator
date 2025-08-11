import { spawn } from "redux-saga/effects";
import { checkRemoveChaosTokenConfirmSaga } from "./checkRemoveSaga";
import { handleRemoveModalActionSaga } from "./handleRemoveModalActionSaga";
import { openRemoveChaosTokenConfirmSaga } from "./openModalSaga";
import { procesChaosTokenRemoveSaga } from "./processRemoveSaga";

export function* removeChaosTokensSaga() {
	yield spawn(checkRemoveChaosTokenConfirmSaga);
	yield spawn(handleRemoveModalActionSaga);
	yield spawn(openRemoveChaosTokenConfirmSaga);
	yield spawn(procesChaosTokenRemoveSaga);
}
