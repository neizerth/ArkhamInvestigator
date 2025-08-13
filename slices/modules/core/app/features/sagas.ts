import { spawn } from "redux-saga/effects";
import { initAppUISaga } from "./init-app-ui/initAppUISaga";

export function* appFeaturesSaga() {
	yield spawn(initAppUISaga);
}
