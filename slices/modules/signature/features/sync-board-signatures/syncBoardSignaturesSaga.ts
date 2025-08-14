import { updateBoardSignatures } from "@modules/signature/entities/updateBoardSignatures/updateBoardSignatures";
import { setSignatureGroups } from "@shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof setSignatureGroups>) {
	yield put(updateBoardSignatures(payload));
}

export function* syncBoardSignaturesSaga() {
	yield takeEvery(setSignatureGroups.match, worker);
}
