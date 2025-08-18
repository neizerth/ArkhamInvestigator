import { ModalActionId } from "@modules/core/modal/entities/base/config";
import { createCustomModalActionSaga } from "@modules/core/modal/shared/base/lib";
import { put } from "redux-saga/effects";
import { restartApp } from "../../entities/restartApp";

function* worker() {
	yield put(restartApp());
}

export const restartAppModalActionSaga = createCustomModalActionSaga({
	actionId: ModalActionId.restartApp,
	worker,
});
