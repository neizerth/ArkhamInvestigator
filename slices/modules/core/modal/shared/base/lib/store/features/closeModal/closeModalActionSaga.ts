import { put, select, takeEvery } from "redux-saga/effects";
import {
	closeModalInternal,
	selectCloseModalFromBackButton,
} from "../../modal";
import { modalActionProcessed } from "../processModalAction";

const filterAction = (action: unknown) => {
	if (!modalActionProcessed.match(action)) {
		return false;
	}

	const { modalAction } = action.payload;

	if (!modalAction.close) {
		return false;
	}

	return true;
};

function* worker() {
	const canClose: ReturnType<typeof selectCloseModalFromBackButton> =
		yield select(selectCloseModalFromBackButton);

	if (!canClose) {
		return;
	}

	yield put(closeModalInternal());
}

export function* closeModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
