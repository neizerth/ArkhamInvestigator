import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagUpdated } from "@modules/chaos-bag/base/shared/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { syncChaosBagContents } from "../syncChaosBagContents";

const filterAction = (action: unknown) => {
	if (!chaosBagUpdated.match(action)) {
		return false;
	}

	return Boolean(action.payload.boardId);
};

type Action = PayloadAction<PropsWithBoardId>;

function* worker({ payload }: Action) {
	const { boardId } = payload;
	yield put(
		syncChaosBagContents({
			boardId,
		}),
	);
}

export function* syncRevealedTokensWithChaosBagContentsSaga() {
	yield takeEvery(filterAction, worker);
}
