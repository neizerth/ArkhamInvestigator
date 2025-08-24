import {
	checkBoardAbilityUse,
	checkBoardAbilityUseFailed,
	checkBoardAbilityUseSuccess,
} from "@modules/board/abilities/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectCanUseBoardAbility } from "../base/lib";

function* worker({ payload }: ReturnType<typeof checkBoardAbilityUse>) {
	const selector = selectCanUseBoardAbility(payload);

	const isValid: ReturnType<typeof selector> = yield select(selector);

	const actionCreator = isValid
		? checkBoardAbilityUseSuccess
		: checkBoardAbilityUseFailed;

	yield put(actionCreator(payload));
}

export function* watchBoardAbilityCheckSaga() {
	yield takeEvery(checkBoardAbilityUse.match, worker);
}
