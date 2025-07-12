import { put, takeEvery } from "redux-saga/effects";
import { closeModalInternal } from "../../modal";
import { modalActionProcessed } from "../processModalAction";

const filterAction = (action: unknown) => {
	if (!modalActionProcessed.match(action)) {
		return false;
	}

	const { modalType, modalAction } = action.payload;

	if (!modalAction.close) {
		return false;
	}

	return modalType !== "prompt";
};

function* worker() {
	yield put(closeModalInternal());
}

export function* closeModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
