import { selectBoardById } from "@modules/board/base/shared/lib";
import { sealChaosToken } from "@modules/chaos-bag/base/entities/lib";
import { chaosBagUpdated } from "@modules/chaos-bag/base/shared/lib";
import { propEq } from "ramda";
import { put, select, take, takeEvery } from "redux-saga/effects";
import { chaosTokensRevealed } from "../../entities/lib";

const filterAction = (action: unknown) => {
	if (!chaosTokensRevealed.match(action)) {
		return false;
	}

	const { payload } = action;
	const { tokens, manual } = payload;
	if (manual) {
		return false;
	}
	return tokens.some(propEq("moon", "type"));
};

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const { tokens, boardId } = payload;
	const moonTokens = tokens.filter(propEq("moon", "type"));

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (moonTokens.length === 0) {
		return;
	}
	yield take(chaosBagUpdated.match);

	for (const token of moonTokens) {
		yield put(
			sealChaosToken({
				id: token.id,
				sealData: {
					type: "investigator",
					boardId: board.id,
				},
			}),
		);
	}
}

export function* revealMoonTokenSaga() {
	yield takeEvery(filterAction, worker);
}
