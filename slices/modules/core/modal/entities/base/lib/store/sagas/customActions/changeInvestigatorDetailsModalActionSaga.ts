import { ModalActionId } from "@modules/core/modal/entities/base/config";
import { createCustomModalActionSaga } from "@modules/core/modal/shared/base/lib";
import { changeSignatureDetails } from "@modules/signature/entities/changeSignatureDetails/changeSignatureDetails";
import { put } from "redux-saga/effects";

function* worker() {
	yield put(changeSignatureDetails());
}

export const changeInvestigatorDetailsModalActionSaga =
	createCustomModalActionSaga({
		actionId: ModalActionId.changeInvestigatorDetails,
		worker,
	});
