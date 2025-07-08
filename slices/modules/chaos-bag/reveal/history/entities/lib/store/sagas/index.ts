import { spawn } from "redux-saga/effects";
import { addRevealHistoryItemFromCurrentSaga } from "./addRevealHistoryItemFromCurrentSaga";
import { endChaosBagRevealSaga } from "./endChaosBagRevealSaga";
import { saveCurrentRevealHistorySaga } from "./saveCurrentRevealHistory";

export function* chaosBagRevealHistoryEntitiesSaga() {
	yield spawn(addRevealHistoryItemFromCurrentSaga);
	yield spawn(endChaosBagRevealSaga);

	yield spawn(saveCurrentRevealHistorySaga);
}
