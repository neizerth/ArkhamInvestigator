import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openPrompt } from "@modules/core/modal/shared/prompt/lib";
import { selectArtworkUrl } from "@modules/core/theme/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { artworkModalId, setArtworkModalActionId } from "../config";
import { openArtworkModal } from "../openArtworkModal";

function* worker() {
	const url: ReturnType<typeof selectArtworkUrl> =
		yield select(selectArtworkUrl);
	const defaultValue = url ?? "";
	yield put(
		openPrompt({
			id: artworkModalId,
			data: {
				title: "modal.artwork.title",
				text: "modal.artwork.text",
				placeholder: "modal.artwork.placeholder",
				defaultValue,
				inputProps: {
					keyboardType: "url",
					autoCapitalize: "none",
				},
				actions: [
					createConfirmModalAction({
						id: setArtworkModalActionId,
						close: false,
						title: "modal.artwork.action",
					}),
				],
			},
		}),
	);
}

export function* openArtworkModalSaga() {
	yield takeEvery(openArtworkModal.match, worker);
}
