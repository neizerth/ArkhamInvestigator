import { getResources } from "@modules/board/base/entities/base/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import type { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import { createElderSignSuccessFilter } from "@modules/chaos-bag/reveal/base/entities/lib/store/features/endChaosBagReveal/createElderSignSuccessFilter";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createElderSignSuccessFilter("success");

function* worker({ payload }: ReturnType<typeof chaosBagRevealEnd>) {
	const { skillCheckBoardId } = payload;

	if (!skillCheckBoardId) {
		return;
	}

	const boardSelector = selectBoardById(skillCheckBoardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.investigator.code !== InvesigatorCode.JoeDiamond.core2026) {
		return;
	}

	yield put(
		getResources({
			boardId: board.id,
			value: 1,
		}),
	);

	yield put(
		sendInvestigatorNotification({
			boardId: board.id,
			message: "ability.joe.core2026.elderSign",
		}),
	);
}

export function* Core2026JoeDiamondElderSignSaga() {
	yield takeEvery(filterAction, worker);
}
