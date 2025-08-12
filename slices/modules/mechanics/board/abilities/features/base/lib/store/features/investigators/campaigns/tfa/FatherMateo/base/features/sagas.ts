import { fork } from "redux-saga/effects";
import { BaseFatherMateoCancelAutoFailSaga } from "./cancelAutoFail/sagas";
import { BaseFatherMateoElderSignConfirmSaga } from "./elderSignConfirm/sagas";

export function* BaseFatherMateoAbilitySaga() {
	yield fork(BaseFatherMateoCancelAutoFailSaga);
	yield fork(BaseFatherMateoElderSignConfirmSaga);
}
