import { spawn } from "redux-saga/effects";
import { addBoardSkillCheckItemSaga } from "./addBoardSkillCheckItemSaga";
import { removeBoardSkillCheckItemSaga } from "./removeBoardSkillCheckItemSaga";

export function* skillCheckSaga() {
	yield spawn(addBoardSkillCheckItemSaga);
	yield spawn(removeBoardSkillCheckItemSaga);
}
