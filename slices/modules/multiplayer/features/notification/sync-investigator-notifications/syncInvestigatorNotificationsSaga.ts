import { selectCurrentBoard } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import {
	createRemoteAction,
	filterTCPOutcomeAction,
	sendRemoteAction,
} from "@modules/core/network/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = filterTCPOutcomeAction(sendInvestigatorNotification.match);

function* worker(
	sourceAction: ReturnType<typeof sendInvestigatorNotification>,
) {
	const currentBoard: ReturnType<typeof selectCurrentBoard> =
		yield select(selectCurrentBoard);

	const { payload } = sourceAction;

	const getId = (id?: BoardId | null) =>
		id === "current" ? currentBoard.id : id;

	const action = {
		...sourceAction,
		payload: {
			...payload,
			boardId: getId(payload.boardId),
			sourceBoardId: getId(payload.sourceBoardId),
		},
	};
	const remoteAction = createRemoteAction(action, {
		notify: "all",
	});

	yield put(
		sendRemoteAction({
			action: remoteAction,
		}),
	);
}

export function* syncInvestigatorNotificationsSaga() {
	yield takeEvery(filterAction, worker);
}
