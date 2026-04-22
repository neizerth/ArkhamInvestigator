import { healDamage } from "@modules/board/base/entities/base/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import type { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import { createElderSignSuccessFilter } from "@modules/chaos-bag/reveal/base/entities/lib/store/features/endChaosBagReveal";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createElderSignSuccessFilter("success");

function* worker({ payload }: ReturnType<typeof chaosBagRevealEnd>) {
	const boardId = payload.skillCheckBoardId;

	if (!boardId) {
		return;
	}

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.investigator.code !== InvesigatorCode.MarieLambeau.chapter2) {
		return;
	}

	yield put(
		healDamage({
			boardId,
		}),
	);
}

export function* MarieLambeauElderSignSaga() {
	yield takeEvery(filterAction, worker);
}
