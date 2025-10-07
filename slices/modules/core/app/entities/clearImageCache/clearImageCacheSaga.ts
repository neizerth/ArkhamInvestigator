import { sendNotification } from "@modules/core/notifications/shared/lib";
import { Image } from "expo-image";
import { put, takeEvery } from "redux-saga/effects";
import { clearImageCache } from "./clearImageCache";

function* worker() {
	Image.clearDiskCache();
	Image.clearMemoryCache();

	yield put(
		sendNotification({
			message: "Image cache cleared",
		}),
	);
}

export function* clearImageCacheSaga() {
	yield takeEvery(clearImageCache.match, worker);
}
