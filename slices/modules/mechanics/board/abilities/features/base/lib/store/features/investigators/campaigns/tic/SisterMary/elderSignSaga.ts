import { selectBoardById } from "@modules/board/base/shared/lib";
import {
	addSingleChaosToken,
	selectCanAddChaosToken,
} from "@modules/chaos-bag/base/entities/lib";
import type { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import { filterElderSignSuccess } from "@modules/chaos-bag/reveal/base/entities/lib/store/features/endChaosBagReveal/filterElderSignSuccess";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = filterElderSignSuccess("success");

function* worker({ payload }: ReturnType<typeof chaosBagRevealEnd>) {
	const { skillCheckBoardId } = payload;

	if (!skillCheckBoardId) {
		return;
	}

	const boardSelector = selectBoardById(skillCheckBoardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.investigator.code !== InvesigatorCode.SisterMary) {
		return;
	}

	const canAddSelector = selectCanAddChaosToken("bless");

	const validation: ReturnType<typeof canAddSelector> =
		yield select(canAddSelector);

	const { available } = validation;

	if (available === 0) {
		return;
	}

	yield put(
		addSingleChaosToken({
			...payload,
			source: "effect",
			type: "bless",
		}),
	);
}

export function* SisterMaryElderSignSaga() {
	yield takeEvery(filterAction, worker);
}
