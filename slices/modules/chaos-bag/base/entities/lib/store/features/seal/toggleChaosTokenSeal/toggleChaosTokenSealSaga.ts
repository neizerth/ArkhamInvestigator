import { selectChaosBagTokenById } from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { sealChaosToken } from "../sealChaosToken";
import { unsealChaosToken } from "../unsealChaosToken";
import { toggleChaosTokenSeal } from "./toggleChaosTokenSeal";

function* worker({ payload }: ReturnType<typeof toggleChaosTokenSeal>) {
	const { id, returnToRevealModal } = payload;
	const tokenSelector = selectChaosBagTokenById(id);

	const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	if (!token) {
		return;
	}

	const { sealed } = token;

	if (sealed) {
		yield put(
			unsealChaosToken({
				...payload,
				returnToRevealModal,
			}),
		);
		return;
	}

	yield put(sealChaosToken(payload));
}

export function* toggleChaosTokenSealSaga() {
	yield takeEvery(toggleChaosTokenSeal.match, worker);
}
