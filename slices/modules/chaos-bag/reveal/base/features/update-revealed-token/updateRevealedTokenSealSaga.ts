import {
	sealChaosToken,
	unsealChaosToken,
} from "@modules/chaos-bag/base/entities/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { updateRevealedToken } from "../../shared/lib";

type Action = PayloadAction<{ id: string }>;

export const createSealWorker = (sealed: boolean) =>
	function* worker({ payload }: Action) {
		const { id } = payload;
		yield put(
			updateRevealedToken({
				id,
				sealed,
			}),
		);
	};

const sealWorker = createSealWorker(true);
const unsealWorker = createSealWorker(false);

export function* updateRevealedTokenSealSaga() {
	yield takeEvery(sealChaosToken.match, sealWorker);
	yield takeEvery(unsealChaosToken.match, unsealWorker);
}
