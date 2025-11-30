import { spawn } from "redux-saga/effects";
import { handleTokenUnsealSaga } from "./handleTokenUnseal/handleTokenUnsealSaga";
import { unsealMoonTokenSaga } from "./moon";
import { unsealTokenSaga } from "./unsealToken/unsealTokenSaga";

export function* unsealChaosTokenSaga() {
	yield spawn(unsealTokenSaga);
	yield spawn(handleTokenUnsealSaga);
	yield spawn(unsealMoonTokenSaga);
}
