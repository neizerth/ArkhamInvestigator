import {
	type chaosTokensRevealed,
	createRevealedTokenFilterAction,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, takeEvery } from "redux-saga/effects";
import { swapCard } from "./swapCard";

const filterAction = createRevealedTokenFilterAction({
	code: InvesigatorCode.BeastWithin,
	tokens: ["autoFail", "elderSign"],
});

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const { boardId } = payload;

	yield put(
		swapCard({
			boardId,
			code: InvesigatorCode.HenryBigby,
		}),
	);
}
export function* BeastWithinAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
