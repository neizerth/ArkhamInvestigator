import {
	selectBoardById,
	selectInvestigatorBoards,
} from "@modules/board/base/shared/lib";
import { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { openCustomModal } from "@modules/core/modal/shared/custom/lib";
import {
	getBoardDamage,
	getBoardHorror,
} from "@modules/mechanics/board/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = (action: unknown) => {
	if (!chaosBagRevealEnd.match(action)) {
		return false;
	}

	const { allRevealedTokens, failed } = action.payload;

	const haveElderSign = allRevealedTokens.some(
		(token) => token.type === "elderSign",
	);

	return haveElderSign && failed === false;
};

function* worker({ payload }: ReturnType<typeof chaosBagRevealEnd>) {
	const { skillCheckBoardId } = payload;
	if (!skillCheckBoardId) {
		return;
	}

	const boardSelector = selectBoardById(skillCheckBoardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.investigator.code !== InvesigatorCode.LuciaDeveraux) {
		return;
	}

	const boards: ReturnType<typeof selectInvestigatorBoards> = yield select(
		selectInvestigatorBoards,
	);

	const availableBoards = boards.filter(
		(board) => getBoardHorror(board) > 0 || getBoardDamage(board) > 0,
	);

	if (availableBoards.length === 0) {
		return;
	}

	yield put(
		openCustomModal({
			id: CustomModalId.LuciaDeveraux,
			data: {
				faction: "rogue",
				title: "ability.lucia.elderSign.title",
				subtitle: board.investigator.name,
				actions: [],
			},
		}),
	);
}

export function* LuciaDeverauxElderSignRevealSaga() {
	yield takeEvery(filterAction, worker);
}
