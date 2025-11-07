import { modalClosed } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { openChaosTokenRevealModal } from "../features";

type Options = {
	modalId: string;
	name: string;
	force?: boolean;
};

export const createReturnToChaosTokenRevealModalSaga = ({
	modalId,
	name,
	force = false,
}: Options) => {
	const filterAction = (action: unknown) => {
		if (!modalClosed.match(action)) {
			return false;
		}

		const { payload } = action;
		return payload.modalId === modalId;
	};

	function* worker() {
		yield put(openChaosTokenRevealModal(force));
	}
	function* watcher() {
		yield takeEvery(filterAction, worker);
	}

	watcher.name = name;

	return watcher;
};
