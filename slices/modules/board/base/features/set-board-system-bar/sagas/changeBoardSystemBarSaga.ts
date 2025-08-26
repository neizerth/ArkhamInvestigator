import { selectBoardById } from "@modules/board/base/shared/lib";
import type { Defined } from "@shared/model";
import { SystemBars, type SystemBarsProps } from "react-native-edge-to-edge";
import { select, takeEvery } from "redux-saga/effects";
import { setBoardSystemBar } from "../setBoardSystemBar";

type SystemBarStyle = Defined<SystemBarsProps["style"]>;

function* worker({ payload }: ReturnType<typeof setBoardSystemBar>) {
	const boardSelector = selectBoardById(payload);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const { light = false } = board.image;
	const style: SystemBarStyle = light ? "dark" : "light";

	SystemBars.setStyle(style);
}

export function* changeBoardSystemBarSaga() {
	yield takeEvery(setBoardSystemBar.match, worker);
}
