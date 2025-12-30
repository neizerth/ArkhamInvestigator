import { setInvestigatorBoards } from "@modules/board/base/shared/lib";
import { startGame } from "@modules/game/entities/startGame";
import { createInvestigatorBoard } from "@modules/mechanics/board/base/entities/lib";
import { selectSignatureSettings } from "@modules/signature/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectSelectedSignatures } from "../../shared/lib";

function* worker() {
	const settings: ReturnType<typeof selectSignatureSettings> = yield select(
		selectSignatureSettings,
	);
	const selectedSignatures: ReturnType<typeof selectSelectedSignatures> =
		yield select(selectSelectedSignatures);

	const selected = selectedSignatures ?? [];

	const boards = selected.map((selection, index) => {
		const { signature } = selection;
		const { code } = signature;
		const signatureSettings = settings?.[code] || {};

		const id = index + 1;

		return createInvestigatorBoard({
			...selection,
			...signatureSettings,
			investigator: signature,
			id,
			index,
		});
	});

	yield put(setInvestigatorBoards(boards));
}

export function* setSelectedSignaturesOnGameStartSaga() {
	yield takeEvery(startGame.match, worker);
}
