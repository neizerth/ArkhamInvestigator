import { takeEvery } from "redux-saga/effects";

import type { GenericFunction } from "@shared/model";
import { createModalActionFilter } from "./createModalActionFilter";

type Options = {
	name?: string;
	actionId: string;
	worker: GenericFunction;
};

export const createCustomModalActionSaga = (options: Options) => {
	const { actionId, name, worker } = options;
	const filterAction = createModalActionFilter({
		ids: [actionId],
	});

	function* customModalActionSaga() {
		yield takeEvery(filterAction, worker);
	}

	if (name) {
		customModalActionSaga.name = name;
	}

	return customModalActionSaga;
};
