import { createTouchFilter } from "@modules/core/touch/shared/lib";
import { createUIEventFilter } from "@modules/core/ui/lib/store/util";
import { takeEvery } from "redux-saga/effects";
import { createSoundWorker } from "../../entities/base/lib/store/util";

const filterPressAction = createTouchFilter({
	type: "picker",
	touchType: "press",
	canceled: false,
});

const filterPickerChanging = createUIEventFilter({
	source: "picker",
	type: "changing",
	canceled: false,
});

const worker = createSoundWorker("switchTap");

export function* triggerPickerSoundSaga() {
	yield takeEvery(filterPressAction, worker);
	yield takeEvery(filterPickerChanging, worker);
}
