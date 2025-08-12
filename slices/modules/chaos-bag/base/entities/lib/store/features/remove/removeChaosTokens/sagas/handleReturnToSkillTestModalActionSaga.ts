import { openChaosTokenRevealModal } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { modalClosed } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { returnToSkillTestModalActionId } from "../config";

const filterAction = (action: unknown) => {
	if (!modalClosed.match(action)) {
		return false;
	}

	const { payload } = action;
	return payload.modalAction?.id === returnToSkillTestModalActionId;
};

function* worker() {
	yield put(openChaosTokenRevealModal());
}

export function* handleReturnToSkillTestModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
