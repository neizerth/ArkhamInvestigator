import { createFollowURLModalAction } from "@modules/core/modal/shared/actions/custom/follow-url/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { APP_DOWNLOAD_URL } from "@shared/config/app";
import { setAppOutdated } from "@shared/lib";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = (action: unknown) => {
	if (!setAppOutdated.match(action)) {
		return false;
	}

	const isOutdated = action.payload;

	return isOutdated === true;
};

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
						title: "Download now",
						url: APP_DOWNLOAD_URL,
					}),
				],
			},
		}),
	);
}

export function* checkOutdatedAppSaga() {
	yield takeEvery(filterAction, worker);
}
