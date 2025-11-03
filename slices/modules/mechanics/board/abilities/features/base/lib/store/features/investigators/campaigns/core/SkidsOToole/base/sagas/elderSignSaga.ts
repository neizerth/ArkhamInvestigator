import { getResources } from "@modules/board/base/entities/base/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { isRevealedTokenActive } from "@modules/chaos-bag/result/shared/lib";
import { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = (action: unknown) => {
	if (!chaosBagRevealEnd.match(action)) {
		return false;
	}

	const { allRevealedTokens, failed } = action.payload;

	if (failed !== false) {
		return false;
	}

	return allRevealedTokens
		.filter(isRevealedTokenActive)
		.some((token) => token.type === "elderSign");
};

function* worker({ payload }: ReturnType<typeof chaosBagRevealEnd>) {
	const { skillCheckBoardId } = payload;

	if (!skillCheckBoardId) {
		return;
	}

	const boardSelector = selectBoardById(skillCheckBoardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);
	const { code } = board.investigator;

	if (code !== InvesigatorCode.SkidsOToole.base) {
		return;
	}

	yield put(
		getResources({
			boardId: skillCheckBoardId,
			value: 2,
		}),
	);
}

export function* BaseSkidsOTooleElderSignSaga() {
	yield takeEvery(filterAction, worker);
}
