import { revealChaosTokens } from "@modules/chaos-bag/reveal/base/entities/lib";
import { selectChaosBagSkillCheckBoardId } from "@modules/chaos-bag/reveal/base/shared/lib";
import { openChaosTokenRevealModal } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { modalClosed } from "@modules/core/modal/shared/base/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalId } from "../config";

const filterAction = (action: unknown) => {
	if (!modalClosed.match(action)) {
		return false;
	}

	const { payload } = action;
	return payload.modalId === modalId;
};

function* worker({ payload }: ReturnType<typeof modalClosed>) {
	const boardId: ReturnType<typeof selectChaosBagSkillCheckBoardId> =
		yield select(selectChaosBagSkillCheckBoardId);

	if (!boardId) {
		return;
	}

	yield put(
		revealChaosTokens({
			boardId,
			count: 1,
			force: true,
		}),
	);

	yield put(openChaosTokenRevealModal());
}

export function* ParallelFatherMateoReturnToRevealSaga() {
	yield takeEvery(filterAction, worker);
}
