import { ModalActionId } from "@modules/core/modal/entities/base/config";
import { createCustomModalActionSaga } from "@modules/core/modal/shared/base/lib";
import { changeInvestigatorDetails } from "@modules/signature/shared/lib";
import { put } from "redux-saga/effects";

function* worker() {
	yield put(changeInvestigatorDetails());
}

export const changeInvestigatorDetailsModalActionSaga =
	createCustomModalActionSaga({
		actionId: ModalActionId.changeInvestigatorDetails,
		worker,
	});
