import { put, select, takeEvery } from "redux-saga/effects";
import type { BaseModalAction, BaseModalData } from "../../../../model";
import { selectModalData, selectModalId, selectModalType } from "../../modal";
import { modalActionProcessed, processModalAction } from "./processModalAction";

function* worker<
	Action extends BaseModalAction,
	Data extends BaseModalData<Action>,
>({ payload }: ReturnType<typeof processModalAction>) {
	const modalId: ReturnType<typeof selectModalId> = yield select(selectModalId);
	const modalData: Data | null = yield select(selectModalData);
	const modalType: ReturnType<typeof selectModalType> =
		yield select(selectModalType);

	if (!modalId || !modalData || !modalType) {
		return;
	}

	yield put(
		modalActionProcessed({
			...payload,
			modalData,
			modalId,
			modalType,
		}),
	);
}

export function* closeModalActionSaga() {
	yield takeEvery(processModalAction.match, worker);
}
