import { ModalActionId } from "@modules/core/modal/entities/config";
import { createCustomModalActionSaga } from "@modules/core/modal/shared/base/lib";
import { startNewGame } from "@shared/lib";
import { put } from "redux-saga/effects";

function* worker() {
	yield put(startNewGame());
}

export const startNewGameModalActionSaga = createCustomModalActionSaga({
	actionId: ModalActionId.startNewGame,
	worker,
});
