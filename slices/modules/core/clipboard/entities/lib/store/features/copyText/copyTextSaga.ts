import { setClipboardContents } from "@modules/core/clipboard/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { call, put, takeEvery } from "redux-saga/effects";
import { copyText } from "./copyText";
function* worker({ payload }: ReturnType<typeof copyText>) {
	const { text, message = "clipboard.successCopy" } = payload;
	try {
		yield call(setClipboardContents, text);

		yield put(
			sendNotification({
				message,
				type: "success",
			}),
		);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "clipboard.errorCopy";

		yield put(
			sendNotification({
				message,
				type: "error",
			}),
		);
	}
}

export function* copyTextSaga() {
	yield takeEvery(copyText.match, worker);
}
