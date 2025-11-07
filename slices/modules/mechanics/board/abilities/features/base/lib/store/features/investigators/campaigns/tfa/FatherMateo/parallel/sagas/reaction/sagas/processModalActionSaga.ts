import { selectBoardById } from "@modules/board/base/shared/lib";
import { revealChaosTokenById } from "@modules/chaos-bag/reveal/base/entities/lib";
import { selectAvailableTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import {
	createConfirmModalFilter,
	type modalConfirmed,
} from "@modules/core/modal/shared/actions/confirm/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalId } from "../config";

const filterAction = createConfirmModalFilter({
	modalId,
});

function* worker({ payload }: ReturnType<typeof modalConfirmed>) {
	const { boardId } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const contents: ReturnType<typeof selectAvailableTokens> = yield select(
		selectAvailableTokens,
	);

	const sealedToken = contents.find(
		({ sealData }) =>
			sealData?.type === "investigator" && sealData.boardId === board.id,
	);

	if (!sealedToken) {
		return;
	}

	yield put(
		revealChaosTokenById({
			boardId,
			id: sealedToken.id,
		}),
	);
}

export function* ParallelFatherMateoProcessModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
