import { selectCurrentBoard } from "@modules/board/base/shared/lib";
import { goToPage } from "@modules/core/router/shared/lib";
import { selectSignatureGroups } from "@modules/signature/base/shared/lib";
import { routes } from "@shared/config";
import { setSignatureSelection, whereId } from "@shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { changeSignatureDetails } from "./changeSignatureDetails";

function* worker() {
	const board: ReturnType<typeof selectCurrentBoard> =
		yield select(selectCurrentBoard);

	const { signatureGroupId, investigator, skinId = null } = board;
	const groups: ReturnType<typeof selectSignatureGroups> = yield select(
		selectSignatureGroups,
	);
	const group = groups.find(whereId(signatureGroupId));

	if (!group) {
		return;
	}
	yield put(
		setSignatureSelection({
			group,
			signatureId: investigator.id,
			skinId,
		}),
	);

	yield put(goToPage(routes.selectInvestigatorDetails));
}

export function* changeSignatureDetailsSaga() {
	yield takeEvery(changeSignatureDetails.match, worker);
}
