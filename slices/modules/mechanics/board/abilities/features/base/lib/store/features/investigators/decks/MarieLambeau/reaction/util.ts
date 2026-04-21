import type { BoardId } from "@modules/board/base/shared/model";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { put } from "redux-saga/effects";

export function* sendMarieLambeauReactionNotification(boardId: BoardId) {
	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "ability.marie.chapter2.reaction",
			type: "info",
		}),
	);
}
