import { put, takeEvery } from "redux-saga/effects";
import { modalActionProcessed } from "../processModalAction";
import { closeModal } from "./closeModal";

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

function* worker({ payload }: ReturnType<typeof modalActionProcessed>) {
	yield put(
		closeModal({
			...payload,
			source: "action",
		}),
	);
}

export function* closeModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
