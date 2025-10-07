import { spawn } from "redux-saga/effects";
import { updateReferenceCardSideSaga } from "./update-reference-card-side/updateReferenceCardSideSaga";

export function* storiesFeaturesSaga() {
	yield spawn(updateReferenceCardSideSaga);
}
