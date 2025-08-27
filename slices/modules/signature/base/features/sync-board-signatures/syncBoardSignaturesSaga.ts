import { updateBoardSignatures } from "@modules/signature/base/entities/lib/store/features/updateBoardSignatures/updateBoardSignatures";
import { setSignatureGroups } from "@modules/signature/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof setSignatureGroups>) {
	yield put(updateBoardSignatures(payload));
}

export function* syncBoardSignaturesSaga() {
	yield takeEvery(setSignatureGroups.match, worker);
}
