import { restartApp } from "@modules/core/app/entities/restartApp";
import { setModalError } from "@modules/core/modal/shared/base/lib";
import {
	createPromptModalActionFilter,
	type promptConfirmed,
} from "@modules/core/modal/shared/prompt/lib";
import { testUrl } from "@modules/core/network/shared/lib/logic";
import { setArtworkUrl } from "@modules/core/theme/shared/lib";
import { getArtworkImagesArchiveUrl } from "@modules/core/theme/shared/lib/logic";
import { isUrl } from "@shared/lib";
import type { ReturnAwaited } from "@shared/model";
import mime from "mime";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import { setArtworkModalActionId } from "../config";

const filterAction = createPromptModalActionFilter({
	actionId: setArtworkModalActionId,
});

function* worker({ payload }: ReturnType<typeof promptConfirmed>) {
	const { value } = payload;
	const url = value.trim().replace(/\/$/, "");

	if (!isUrl(url)) {
		yield put(setModalError("modal.artwork.error.invalidUrl"));
		return;
	}
	const archiveUrl = getArtworkImagesArchiveUrl(url);
	const response: ReturnAwaited<typeof testUrl> = yield call(
		testUrl,
		archiveUrl,
	);

	if (!response) {
		yield put(setModalError("modal.artwork.error.invalidUrl"));
		return;
	}

	const contentType = response.headers.get("content-type");
	const extension = contentType && mime.getExtension(contentType);

	if (extension !== "zip") {
		yield put(setModalError("modal.artwork.error.invalidUrl"));
		return;
	}

	yield put(setArtworkUrl(url));
	yield delay(100);

	yield put(restartApp());
}

export function* validateArtworkUrlSaga() {
	yield takeEvery(filterAction, worker);
}
