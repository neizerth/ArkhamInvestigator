import { getResources } from "@modules/board/base/entities/base/lib";
import {
	type chaosTokensRevealed,
	createRevealedTokenFilterAction,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createRevealedTokenFilterAction({
	code: InvesigatorCode.AndrePatel,
	tokens: ["elderSign"],
});

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const { boardId } = payload;

	yield put(
		getResources({
			boardId,
		}),
	);
}

export function* AndrePatelElderSignSaga() {
	yield takeEvery(filterAction, worker);
}
