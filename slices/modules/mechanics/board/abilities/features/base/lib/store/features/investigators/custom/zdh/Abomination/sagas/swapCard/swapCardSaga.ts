import { selectBoardById } from "@modules/board/base/shared/lib";
import {
	createInvestigatorBoard,
	replaceBoard,
} from "@modules/mechanics/board/base/entities/lib";
import { selectInvestigatorByCode } from "@modules/signature/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { swapCard } from "./swapCard";
function* worker({ payload }: ReturnType<typeof swapCard>) {
	const { boardId, code } = payload;

	const sourceBoardSelector = selectBoardById(boardId);
	const sourceBoard: ReturnType<typeof sourceBoardSelector> =
		yield select(sourceBoardSelector);

	const signatureGroupSelector = selectInvestigatorByCode(code);
	const signatureGroup: ReturnType<typeof signatureGroupSelector> =
		yield select(signatureGroupSelector);

	if (!signatureGroup) {
		return;
	}

	const investigator = signatureGroup.signatures[0];

	const targetBoard = createInvestigatorBoard({
		...investigator,
		id: sourceBoard.id,
		index: sourceBoard.index,
		investigator,
		signatureGroupId: signatureGroup.id,
	});

	console.log(targetBoard.value);

	yield put(
		replaceBoard({
			boardId,
			board: targetBoard,
			keepHandSize: true,
			keepDoom: true,
			keepActions: true,
			keepClues: true,
			keepResources: true,
			keepDamage: true,
			keepHorror: true,
			keepUpkeepResourcesIncrease: true,
		}),
	);
}

export function* swapCardSaga() {
	yield takeEvery(swapCard.match, worker);
}
