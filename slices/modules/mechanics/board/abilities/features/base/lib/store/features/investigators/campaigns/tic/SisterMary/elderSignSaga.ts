import { selectBoardById } from "@modules/board/base/shared/lib";
import {
	addSingleChaosToken,
	selectCanAddChaosToken,
} from "@modules/chaos-bag/base/entities/lib";
import { isRevealedTokenActive } from "@modules/chaos-bag/result/shared/lib";
import { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = (action: unknown) => {
	if (!chaosBagRevealEnd.match(action)) {
		return false;
	}

	const { failed, skillCheckBoardId, allRevealedTokens } = action.payload;

	const haveRevealedElderSign = allRevealedTokens
		.filter(isRevealedTokenActive)
		.some((token) => token.type === "elderSign");

	if (!haveRevealedElderSign) {
		return false;
	}

	return failed === false && Boolean(skillCheckBoardId);
};

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
