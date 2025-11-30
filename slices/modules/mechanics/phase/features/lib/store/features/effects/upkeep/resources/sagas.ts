import { spawn } from "redux-saga/effects";
import { giveUpkeepResourceToBoardSaga } from "./giveUpkeepResourceToBoard/giveUpkeepResourceToBoardSaga";
import { giveUpkeepResourcesToAllBoardsSaga } from "./giveUpkeepResourcesToAllBoards/giveUpkeepResourcesToAllBoardsSaga";
export function* upkeepResourcesSaga() {
	yield spawn(giveUpkeepResourcesToAllBoardsSaga);
	yield spawn(giveUpkeepResourceToBoardSaga);
}
