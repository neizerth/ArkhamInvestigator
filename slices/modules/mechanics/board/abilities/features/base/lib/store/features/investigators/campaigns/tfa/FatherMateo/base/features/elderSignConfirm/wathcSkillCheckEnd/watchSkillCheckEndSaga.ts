import { selectBoardById } from "@modules/board/base/shared/lib";
import { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { elderSignTokenId } from "../../../config";
import { openFatherMateoElderSignConfirm } from "../openElderSignConfirm";

const code = InvesigatorCode.FatherMateo.base;

const filterAction = (action: unknown) => {
	if (!chaosBagRevealEnd.match(action)) {
		return false;
	}

	const { allRevealedTokens } = action.payload;
	return allRevealedTokens.some((token) => token.id === elderSignTokenId);
};

function* worker({ payload }: ReturnType<typeof chaosBagRevealEnd>) {
	const { boardId } = payload;

	if (!boardId) {
		console.log("no boardId", boardId);
		return;
	}

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.investigator.code !== InvesigatorCode.FatherMateo.base) {
		return;
	}

	yield put(
		openFatherMateoElderSignConfirm({
			boardId,
		}),
	);
}

export function* watchFatherMateoSkillCheckEndSaga() {
	yield takeEvery(filterAction, worker);
}
