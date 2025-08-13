import { appIsOutdated } from "@modules/core/app/shared/lib";
import { createFollowURLModalAction } from "@modules/core/modal/shared/actions/custom/follow-url/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { APP_DOWNLOAD_URL } from "@shared/config/app";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(
		openConfirm({
			id: "outdated-app",
			data: {
				faction: "survivor",
				title: "app.outdated.title",
				text: "app.outdated.text",
				actions: [
					createFollowURLModalAction({
						icon: "download",
						title: "Download now",
						url: APP_DOWNLOAD_URL,
					}),
				],
			},
		}),
	);
}

export function* checkOutdatedAppSaga() {
	yield takeEvery(appIsOutdated.match, worker);
}
