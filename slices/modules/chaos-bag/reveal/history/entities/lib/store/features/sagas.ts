import { spawn } from "redux-saga/effects";
import { addRevealHistoryItemFromCurrentSaga } from "./addRevealHistoryItemFromCurrent/addRevealHistoryItemFromCurrentSaga";

export function* chaosBagRevealHistoryEntitiesSaga() {
	yield spawn(addRevealHistoryItemFromCurrentSaga);
}
