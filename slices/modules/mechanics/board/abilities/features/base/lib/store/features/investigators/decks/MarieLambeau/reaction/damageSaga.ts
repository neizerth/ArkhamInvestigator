import { boardHistoryItemAdded } from "@modules/board/history/shared/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { call } from "ramda";
import { takeEvery } from "redux-saga/effects";
import { sendMarieLambeauReactionNotification } from "./util";

const filterAction = (action: unknown) => {
	if (!boardHistoryItemAdded.match(action)) {
		return false;
	}
	const { code } = action.payload;

	if (code !== InvesigatorCode.MarieLambeau.chapter2) {
		return false;
	}

	return true;
};

function* worker({ payload }: ReturnType<typeof boardHistoryItemAdded>) {
	const { boardId, item, board } = payload;

	if (!item.value) {
		return;
	}

	if (typeof item.value.health !== "number") {
		return;
	}
	const diff = item.value.health - board.value.health;

	if (diff >= 0) {
		return;
	}

	yield call(sendMarieLambeauReactionNotification, boardId);
}

export function* MarieLambeauReactionDamageSaga() {
	yield takeEvery(filterAction, worker);
}
