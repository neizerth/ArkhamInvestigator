import { ModalActionId } from "@modules/core/modal/entities/base/config";
import { createCustomModalActionSaga } from "@modules/core/modal/shared/base/lib";
import { startNewGame } from "@modules/game/entities/startNewGame";
import { put } from "redux-saga/effects";

function* worker() {
	yield put(startNewGame());
}

export const startNewGameModalActionSaga = createCustomModalActionSaga({
	actionId: ModalActionId.startNewGame,
	worker,
});
