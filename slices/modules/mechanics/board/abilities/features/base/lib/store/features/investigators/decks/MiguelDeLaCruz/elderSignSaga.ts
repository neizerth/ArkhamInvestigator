import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import {
	type chaosTokensRevealed,
	createRevealedTokenFilterAction,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createRevealedTokenFilterAction({
	code: InvesigatorCode.MiguelDeLaCruz,
	tokens: ["elderSign"],
});

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const { boardId } = payload;

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "ability.miguel.elderSign",
		}),
	);
}

export function* MiguelDeLaCruzElderSignSaga() {
	yield takeEvery(filterAction, worker);
}
