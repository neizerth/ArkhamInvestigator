import {
	selectInvestigatorBoards,
	setBoardProp,
} from "@modules/board/base/shared/lib";
import { whereId } from "@shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { updateBoardSignatures } from "./updateBoardSignatures";

function* worker({
	payload: groups,
}: ReturnType<typeof updateBoardSignatures>) {
	const boards: ReturnType<typeof selectInvestigatorBoards> = yield select(
		selectInvestigatorBoards,
	);

	for (const board of boards) {
		const group = groups.find(whereId(board.signatureGroupId));

		if (!group) {
			continue;
		}

		const value = group.signatures.find(whereId(board.investigator.id));

		if (!value) {
			continue;
		}

		yield put(
			setBoardProp({
				boardId: board.id,
				prop: "investigator",
				value,
			}),
		);
	}
}

export function* updateBoardSignaturesSaga() {
	yield takeEvery(updateBoardSignatures.match, worker);
}
