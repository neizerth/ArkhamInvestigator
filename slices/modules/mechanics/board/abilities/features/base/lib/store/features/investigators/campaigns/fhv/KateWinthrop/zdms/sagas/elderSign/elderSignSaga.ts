import { selectBoardById } from "@modules/board/base/shared/lib";
import type { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import { createElderSignSuccessFilter } from "@modules/chaos-bag/reveal/base/entities/lib/store/features/endChaosBagReveal/createElderSignSuccessFilter";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { chargeFluxStabilizer } from "../chargeFluxStabilizer";

const filterAction = createElderSignSuccessFilter("success");

function* worker({ payload }: ReturnType<typeof chaosBagRevealEnd>) {
	const { skillCheckBoardId } = payload;

	if (!skillCheckBoardId) {
		return;
	}

	const boardSelector = selectBoardById(skillCheckBoardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const { investigator } = board;

	if (investigator.code !== InvesigatorCode.KateWinthrop.darkMatter) {
		return;
	}

	yield put(
		chargeFluxStabilizer({
			boardId: skillCheckBoardId,
		}),
	);
}

export function* DarkMatterKateWinthropElderSignSaga() {
	yield takeEvery(filterAction, worker);
}
