import { selectBoardById } from "@modules/board/base/shared/lib";
import {
	setChaosBagSkillCheckType,
	setChaosBagSkillValue,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { setRevealSkillValueFromType } from "./setRevealSkillValueFromType";

function* worker({ payload }: ReturnType<typeof setRevealSkillValueFromType>) {
	const { type, boardId } = payload;
	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const value = board.value[type];

	yield put(setChaosBagSkillValue(value));
	yield put(setChaosBagSkillCheckType(type));
}

export function* setRevealSkillValueFromTypeSaga() {
	yield takeEvery(setRevealSkillValueFromType.match, worker);
}
