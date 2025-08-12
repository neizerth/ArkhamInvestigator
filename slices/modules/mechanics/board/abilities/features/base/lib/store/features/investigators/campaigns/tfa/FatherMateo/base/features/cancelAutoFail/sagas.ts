import { fork } from "redux-saga/effects";
import { handleFatherMateoAddElderSignModalActionSaga as addElderSignSaga } from "./handleAddElderSignModalAction/handleAddElderSignModalActionSaga";
import { FatherMateoOpenConfirmSaga as openConfirmSaga } from "./openConfirm/openConfirmSaga";
import { FatherMateoWatchAutoFailCancelSaga as watchAutoFailCancelSaga } from "./watchAutoFailCancel/watchAutoFailCancelSaga";
import { FatherMateoWatchConfirmCloseSaga as watchConfirmCloseSaga } from "./watchConfirmClose/watchConfirmCloseSaga";

export function* BaseFatherMateoCancelAutoFailSaga() {
	yield fork(openConfirmSaga);
	yield fork(watchAutoFailCancelSaga);
	yield fork(watchConfirmCloseSaga);
	yield fork(addElderSignSaga);
}
