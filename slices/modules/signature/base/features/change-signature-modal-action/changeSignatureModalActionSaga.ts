import { createCustomModalActionSaga } from "@modules/core/modal/shared/base/lib";
import { changeSignatureDetails } from "@modules/signature/base/entities/lib/store/features/changeSignatureDetails/changeSignatureDetails";
import { changeSignatureModalActionId } from "@modules/signature/base/shared/config";
import { put } from "redux-saga/effects";

function* worker() {
	yield put(changeSignatureDetails());
}

export const changeSignatureModalActionSaga = createCustomModalActionSaga({
	actionId: changeSignatureModalActionId,
	worker,
});
