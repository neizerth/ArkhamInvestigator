import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { put, takeEvery } from "redux-saga/effects";
import { startNewTurn } from "../../../..";
import { resetUpkeepInvestigatorActions } from "./resetUpkeepInvestigatorActions";

function* worker({
	payload,
}: ReturnType<typeof resetUpkeepInvestigatorActions>) {
	const { boardId } = payload;
	yield put(startNewTurn({ boardId }));

	yield put(
		sendInvestigatorNotification({
			message: "upkeep.investigator.actionsReset",
			boardId,
		}),
	);
}

export function* resetUpkeepInvestigatorActionsSaga() {
	yield takeEvery(resetUpkeepInvestigatorActions.match, worker);
}
