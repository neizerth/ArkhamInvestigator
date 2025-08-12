import { fork } from "redux-saga/effects";
import { handleAddElderSignModalActionSaga as addElderSignSaga } from "./handleAddElderSignModalAction/handleAddElderSignModalActionSaga";
import { FatherMateoOpenConfirmSaga as openConfirmSaga } from "./openConfirm/openConfirmSaga";
import { FatherMateoWatchAutoFailCancelSaga as watchAutoFailCancelSaga } from "./watchAutoFailCancel/watchAutoFailCancelSaga";
import { FatherMateoWatchConfirmCloseSaga as watchConfirmCloseSaga } from "./watchConfirmClose/watchConfirmCloseSaga";

export function* BaseFatherMateoAbilitySaga() {
	yield fork(openConfirmSaga);
	yield fork(watchAutoFailCancelSaga);
	yield fork(watchConfirmCloseSaga);
	yield fork(addElderSignSaga);
}
