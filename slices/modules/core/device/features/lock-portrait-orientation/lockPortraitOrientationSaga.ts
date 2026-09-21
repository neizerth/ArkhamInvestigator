import { appStarted } from "@modules/core/app/shared/lib";
import { takeOnce } from "@shared/lib";
import * as ScreenOrientation from "expo-screen-orientation";
import { lockScreenOrientation } from "../../entities/screen-orientation";

function* worker() {
	yield lockScreenOrientation(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}

export function* lockPortraitOrientationSaga() {
	yield takeOnce(appStarted.match, worker);
}
