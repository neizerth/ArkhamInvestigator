import {
	sealChaosToken,
	unsealChaosToken,
} from "@modules/chaos-bag/base/entities/lib";
import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { updateRevealedTokenInternal } from "../../shared/lib";

type Action = PayloadAction<{ token: ChaosBagToken }>;

export const createSealWorker = (sealed: boolean) =>
	function* worker({ payload }: Action) {
		const { token } = payload;
		yield put(
			updateRevealedTokenInternal({
				id: token.id,
				data: {
					sealed,
				},
			}),
		);
	};

const sealWorker = createSealWorker(true);
const unsealWorker = createSealWorker(false);

export function* updateRevealedTokenSealSaga() {
	yield takeEvery(sealChaosToken.match, sealWorker);
	yield takeEvery(unsealChaosToken.match, unsealWorker);
}
