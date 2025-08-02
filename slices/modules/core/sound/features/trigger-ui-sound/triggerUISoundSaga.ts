import { createUIEventFilter } from "@modules/core/ui/lib/store/util";
import { takeEvery } from "redux-saga/effects";
import { createSoundWorker } from "./createSoundWorker";

const filterPickerChanging = createUIEventFilter({
	source: "picker",
	type: "changing",
});

export function* triggerUISoundSaga() {
	yield takeEvery(filterPickerChanging, createSoundWorker("switchTap"));
}
