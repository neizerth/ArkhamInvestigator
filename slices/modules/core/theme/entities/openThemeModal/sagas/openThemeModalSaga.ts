import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openPrompt } from "@modules/core/modal/shared/prompt/lib";
import { put, takeEvery } from "redux-saga/effects";
import { installThemeModalActionId, themeModalId } from "../config";
import { openThemeModal } from "../openThemeModal";

function* worker() {
	yield put(
		openPrompt({
			id: themeModalId,
			data: {
				title: "modal.theme.title",
				text: "modal.theme.text",
				placeholder: "modal.theme.placeholder",
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: installThemeModalActionId,
						title: "Install",
						icon: "download",
					}),
				],
			},
		}),
	);
}

export function* openThemeModalSaga() {
	yield takeEvery(openThemeModal.match, worker);
}
