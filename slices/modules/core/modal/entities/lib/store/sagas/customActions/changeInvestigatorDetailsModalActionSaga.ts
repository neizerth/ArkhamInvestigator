import { ModalActionId } from "@modules/core/modal/entities/config";
import { createCustomModalActionSaga } from "@modules/core/modal/shared/base/lib";
import { changeInvestigatorDetails } from "@shared/lib";
import { put } from "redux-saga/effects";

function* worker() {
	yield put(changeInvestigatorDetails());
}

export const changeInvestigatorDetailsModalActionSaga =
	createCustomModalActionSaga({
		actionId: ModalActionId.changeInvestigatorDetails,
		worker,
	});
