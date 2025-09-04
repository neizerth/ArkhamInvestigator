import {
	chaosBagUpdated,
	selectChaosBagTokenById,
} from "@modules/chaos-bag/base/shared/lib";
import type { ActionCreatorWithPayload, PayloadAction } from "@reduxjs/toolkit";
import { put, select, take } from "redux-saga/effects";
import { chaosTokenUpdated, updateChaosToken } from "../../update";
import type { SealChaosTokenPayload } from "../sealChaosToken";

type SealAction = PayloadAction<SealChaosTokenPayload>;

type Options = {
	sealed: boolean;
	succesAction: ActionCreatorWithPayload<SealChaosTokenPayload>;
};

export const createSealChaosTokenWorker = ({ sealed, succesAction }: Options) =>
	function* worker({ payload }: SealAction) {
		const { id } = payload;
		const tokenSelector = selectChaosBagTokenById(id);

		const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

		if (!token) {
			return;
		}

		const data = {
			...token,
			sealed,
		};

		const updatePayload = {
			id: token.id,
			data,
		};

		yield put(updateChaosToken(updatePayload));

		yield take(chaosTokenUpdated.match);

		yield put(succesAction(payload));

		yield put(chaosBagUpdated(payload));
	};
