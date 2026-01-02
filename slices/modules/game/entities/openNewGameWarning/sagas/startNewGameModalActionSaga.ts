import { ModalActionId } from "@modules/core/modal/entities/base/config";
import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import {
	type ModalActionProcessedPayload,
	createCustomModalActionSaga,
} from "@modules/core/modal/shared/base/lib";
import { startNewGame } from "@modules/game/entities/startNewGame";
import type { GameType } from "@modules/game/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";

type ModalAction = ConfirmModalAction<{
	type: GameType;
}>;

type Payload = ModalActionProcessedPayload<ModalAction>;

type Action = PayloadAction<Payload>;

function* worker(action: Action) {
	const { payload } = action;
	const { type } = payload.modalAction.data;

	yield put(startNewGame({ type }));
}

export const startNewGameModalActionSaga = createCustomModalActionSaga({
	actionId: ModalActionId.startNewGame,
	worker,
});
