import {
	selectBoardById,
	selectBoardsLoadProgress,
} from "@modules/board/base/shared/lib";
import { setStatusBarStyle } from "@modules/core/device/entities/status-bar";
import type { Defined } from "@shared/model";
import type { SystemBarsProps } from "react-native-edge-to-edge";
import { put, select, takeEvery } from "redux-saga/effects";
import { setBoardSystemBar } from "../setBoardSystemBar";

type SystemBarStyle = Defined<SystemBarsProps["style"]>;

function* worker({ payload }: ReturnType<typeof setBoardSystemBar>) {
	const loadProgress: ReturnType<typeof selectBoardsLoadProgress> =
		yield select(selectBoardsLoadProgress);

	if (loadProgress < 100) {
		return;
	}

	const boardSelector = selectBoardById(payload);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const { light = false } = board.image;
	const style: SystemBarStyle = light ? "dark" : "light";

	yield put(setStatusBarStyle(style));
}

export function* changeBoardSystemBarSaga() {
	yield takeEvery(setBoardSystemBar.match, worker);
}
