import { takeEvery } from "redux-saga/effects";
import { installTheme } from "./installTheme";

function* worker({ payload }: ReturnType<typeof installTheme>) {}

export function* installThemeSaga() {
	yield takeEvery(installTheme.match, worker);
}
