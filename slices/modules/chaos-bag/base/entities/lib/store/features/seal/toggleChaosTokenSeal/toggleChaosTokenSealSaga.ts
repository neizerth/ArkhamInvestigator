import { selectChaosBagTokenById } from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { sealChaosToken } from "../sealChaosToken";
import { unsealChaosToken } from "../unsealChaosToken";
import { toggleChaosTokenSeal } from "./toggleChaosTokenSeal";

function* worker({ payload }: ReturnType<typeof toggleChaosTokenSeal>) {
	const { id } = payload;
	const tokenSelector = selectChaosBagTokenById(id);

	const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	if (!token) {
		return;
	}

	const { sealed } = token;

	const action = sealed ? unsealChaosToken : sealChaosToken;

	yield put(action(payload));
}

export function* toggleChaosTokenSealSaga() {
	yield takeEvery(toggleChaosTokenSeal.match, worker);
}
