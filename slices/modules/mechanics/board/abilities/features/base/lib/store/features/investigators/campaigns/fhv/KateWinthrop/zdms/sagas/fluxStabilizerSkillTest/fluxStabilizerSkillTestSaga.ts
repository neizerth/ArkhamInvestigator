import { selectBoardById } from "@modules/board/base/shared/lib";
import { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { isNumber } from "ramda-adjunct";
import { put, select, takeEvery } from "redux-saga/effects";
import { chargeFluxStabilizer } from "../chargeFluxStabilizer";

const filterAction = (action: unknown) => {
	if (!chaosBagRevealEnd.match(action)) {
		return false;
	}

	const { failed, skillCheckBoardId, succeedBy, skillCheckType } =
		action.payload;

	return (
		failed === false &&
		Boolean(skillCheckBoardId) &&
		skillCheckType === "intellect" &&
		isNumber(succeedBy) &&
		succeedBy > 1
	);
};

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

export function* DarkMatterKateWinthropFluxStabilizerSaga() {
	yield takeEvery(filterAction, worker);
}
