import type { AppThunk } from "@shared/model";
import type { Action } from "redux";
import { put, takeEvery } from "redux-saga/effects";
import { createModalActionFilter } from "./createModalActionFilter";

type Options = {
	name?: string;
	actionId: string;
} & (
	| {
			type: "action";
			actionCreator: () => Action;
	  }
	| {
			type: "thunk";
			actionCreator: () => AppThunk;
	  }
);

export const createCustomModalActionSaga = (options: Options) => {
	const { actionId, name } = options;
	const filterAction = createModalActionFilter({
		id: actionId,
	});

	function* worker() {
		console.log(options);
		if (options.type === "action") {
			yield put(options.actionCreator());
			return;
		}
		yield put(options.actionCreator());
	}
	function* customModalActionSaga() {
		yield takeEvery(filterAction, worker);
	}

	if (name) {
		customModalActionSaga.name = name;
	}

	return customModalActionSaga;
};
