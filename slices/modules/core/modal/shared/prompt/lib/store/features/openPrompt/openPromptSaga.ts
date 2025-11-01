import { openModal } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { openPrompt } from "./openPrompt";

function* worker({ payload }: ReturnType<typeof openPrompt>) {
	const { data } = payload;
	const value = data?.defaultValue ?? "";
	yield put(
		openModal({
			...payload,
			type: "prompt",
			value,
		}),
	);
}

export function* openPromptSaga() {
	yield takeEvery(openPrompt.match, worker);
}
