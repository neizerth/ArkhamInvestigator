import { put, takeEvery } from "redux-saga/effects";
import { setBoardAbilityUse } from "../../setBoardAbilityUse";
import { checkBoardAbilityUseSuccess } from "../checkBoardAbilityUse";

function* worker({ payload }: ReturnType<typeof checkBoardAbilityUseSuccess>) {
	yield put(
		setBoardAbilityUse({
			...payload,
			canUse: false,
		}),
	);
}

export function* checkBoardAbilityUseSuccessSaga() {
	yield takeEvery(checkBoardAbilityUseSuccess.match, worker);
}
