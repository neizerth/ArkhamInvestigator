import { takeEvery } from "redux-saga/effects";
import { createModalActionFilter } from "./createModalActionFilter";

type Options = {
	name?: string;
	actionId: string;
	worker: () => void;
};

export const createCustomModalActionSaga = (options: Options) => {
	const { actionId, name, worker } = options;
	const filterAction = createModalActionFilter({
		id: actionId,
	});

	function* customModalActionSaga() {
		yield takeEvery(filterAction, worker);
	}

	if (name) {
		customModalActionSaga.name = name;
	}

	return customModalActionSaga;
};
