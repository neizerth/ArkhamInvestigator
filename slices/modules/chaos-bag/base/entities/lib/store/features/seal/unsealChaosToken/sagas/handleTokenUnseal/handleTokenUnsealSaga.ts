import { selectChaosBagTokenById } from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { unsealChaosToken } from "../../unsealChaosToken";
import { handleUnsealMoonToken } from "../moon/handleUnsealMoonToken";
import { unsealToken } from "../unsealToken";

function* worker({ payload }: ReturnType<typeof unsealChaosToken>) {
	const { id, boardId, returnToRevealModal } = payload;
	const tokenSelector = selectChaosBagTokenById(id);

	const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	if (!token) {
		return;
	}
	const isMoonToken = token.type === "moon";

	if (!isMoonToken) {
		yield put(
			unsealToken({
				boardId,
				token,
			}),
		);
	}

	yield put(
		handleUnsealMoonToken({
			boardId,
			token,
			returnToRevealModal,
		}),
	);
}

export function* handleTokenUnsealSaga() {
	yield takeEvery(unsealChaosToken.match, worker);
}
