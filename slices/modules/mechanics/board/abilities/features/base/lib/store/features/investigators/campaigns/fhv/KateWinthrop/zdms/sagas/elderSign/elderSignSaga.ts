import { selectBoardById } from "@modules/board/base/shared/lib";
import type { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import { filterElderSignSuccess } from "@modules/chaos-bag/reveal/base/entities/lib/store/features/endChaosBagReveal/filterElderSignSuccess";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { chargeFluxStabilizer } from "../chargeFluxStabilizer";

const filterAction = filterElderSignSuccess("success");

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
