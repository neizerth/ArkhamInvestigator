import { selectBoardByCode } from "@modules/board/base/shared/lib";
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
	const { boardId, skillCheckBoardId } = payload;

	if (!boardId) {
		return;
	}

	const boardSelector = selectBoardByCode(code);
	const mateoBoard: ReturnType<typeof boardSelector> =
		yield select(boardSelector);

	if (!mateoBoard.id) {
		return;
	}

	if (skillCheckBoardId !== mateoBoard.id) {
		return false;
	}

	yield put(
		openFatherMateoElderSignConfirm({
			boardId: mateoBoard.id,
		}),
	);
}

export function* watchFatherMateoSkillCheckEndSaga() {
	yield takeEvery(filterAction, worker);
}
