import { spawn } from "redux-saga/effects";
import { sendRemoteTCPActionSaga } from "./send-remote-tcp-action/sendRemoteTCPActionSaga";

export function* commonTcpSagas() {
	yield spawn(sendRemoteTCPActionSaga);
}
