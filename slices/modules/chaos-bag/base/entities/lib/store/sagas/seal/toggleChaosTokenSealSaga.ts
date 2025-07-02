import { put, select, takeEvery } from "redux-saga/effects";
import {
	sealChaosToken,
	toggleChaosTokenSeal,
	unsealChaosToken,
} from "../../actions";
import { selectChaosBagTokenById } from "../../selectors";

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
