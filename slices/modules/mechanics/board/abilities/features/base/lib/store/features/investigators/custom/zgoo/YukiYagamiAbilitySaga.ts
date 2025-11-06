import {
	removeChaosTokens,
	selectCanRemoveChaosTokens,
} from "@modules/chaos-bag/base/entities/lib";
import {
	type chaosTokensRevealed,
	createRevealedTokenFilterAction,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createRevealedTokenFilterAction({
	code: InvesigatorCode.YukiYagami,
	tokens: ["elderSign"],
});

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const { boardId } = payload;

	const validationSelector = selectCanRemoveChaosTokens({
		type: "curse",
		count: 1,
	});

	const validation: ReturnType<typeof validationSelector> =
		yield select(validationSelector);

	if (!validation.canRemove) {
		return;
	}

	yield put(
		removeChaosTokens({
			boardId,
			removeType: "type",
			type: "curse",
			source: "effect",
		}),
	);
}

export function* YukiYagamiAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
