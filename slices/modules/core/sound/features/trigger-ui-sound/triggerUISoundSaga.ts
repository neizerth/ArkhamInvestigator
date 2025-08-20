import { createUIEventFilter } from "@modules/core/ui/lib/store/util";
import { takeLatest } from "redux-saga/effects";
import { createSoundWorker } from "./createSoundWorker";

const filterPickerChanging = createUIEventFilter({
	source: "picker",
	type: "changing",
	canceled: false,
});

export function* triggerUISoundSaga() {
	yield takeLatest(filterPickerChanging, createSoundWorker("switchTap"));
}
