import { appStarted } from "@modules/core/app/shared/lib";
import { takeOnce } from "@shared/lib";
import type { ChannelMessage } from "@shared/model/store";
import { call, put, take } from "redux-saga/effects";
import {
	getOrientationType,
	setScreenOrientation,
	setScreenOrientationType,
} from "../../shared/lib";
import { createScreenOrientationChannel } from "./createScreenOrientationChannel";

export function* worker() {
	const screenOrientationChannel: ReturnType<
		typeof createScreenOrientationChannel
	> = yield call(createScreenOrientationChannel);

	try {
		while (true) {
			const orientation: ChannelMessage<typeof screenOrientationChannel> =
				yield take(screenOrientationChannel);
			const type: ReturnType<typeof getOrientationType> = yield call(
				getOrientationType,
				orientation,
			);

			yield put(setScreenOrientation(orientation));
			yield put(setScreenOrientationType(type ?? null));
		}
	} finally {
		screenOrientationChannel.close();
	}
}

export function* initScreenOrientationSaga() {
	yield takeOnce(appStarted.match, worker);
}
