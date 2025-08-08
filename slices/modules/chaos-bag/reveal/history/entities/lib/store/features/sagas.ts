import { spawn } from "redux-saga/effects";
import { addRevealHistoryItemFromCurrentSaga } from "./addRevealHistoryItemFromCurrent/addRevealHistoryItemFromCurrentSaga";
import { endChaosBagRevealSaga } from "./addRevealHistoryItemFromCurrent/endChaosBagRevealSaga";
import { saveCurrentRevealHistorySaga } from "./currentRevealHistory/sagas";

export function* chaosBagRevealHistoryEntitiesSaga() {
	yield spawn(addRevealHistoryItemFromCurrentSaga);
	yield spawn(endChaosBagRevealSaga);

	yield spawn(saveCurrentRevealHistorySaga);
}
