import { openModal } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { openPrompt } from "./openPrompt";

function* worker({ payload }: ReturnType<typeof openPrompt>) {
	// const { defaultValue } = payload.data;
	const { data } = payload;
	const textValue = data?.defaultValue;
	yield put(
		openModal({
			...payload,
			type: "prompt",
			textValue,
		}),
	);
}

export function* openPromptSaga() {
	yield takeEvery(openPrompt.match, worker);
}
