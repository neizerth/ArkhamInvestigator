import {
	addChaosTokens,
	addSingleChaosToken,
	selectCanAddChaosToken,
} from "@modules/chaos-bag/base/entities/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import {
	type chaosTokensRevealed,
	createRevealedTokenFilterAction,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { compact } from "ramda-adjunct";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createRevealedTokenFilterAction({
	code: InvesigatorCode.KohakuNarukami,
	tokens: ["elderSign"],
});

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const canAddBlessSelector = selectCanAddChaosToken("bless");
	const canAddCurseSelector = selectCanAddChaosToken("curse");

	const validationBless: ReturnType<typeof canAddBlessSelector> =
		yield select(canAddBlessSelector);
	const validationCurse: ReturnType<typeof canAddCurseSelector> =
		yield select(canAddCurseSelector);

	const { available: availableBless } = validationBless;
	const { available: availableCurse } = validationCurse;

	const canAdd = availableBless > 0 || availableCurse > 0;

	if (!canAdd) {
		return;
	}

	const tokens: ChaosTokenType[] = compact([
		availableBless > 0 && "bless",
		availableCurse > 0 && "curse",
	]);

	if (tokens.length === 1) {
		yield put(
			addSingleChaosToken({
				...payload,
				source: "effect",
				type: tokens[0],
			}),
		);
		return;
	}

	yield put(
		addChaosTokens({
			...payload,
			source: "effect",
			tokens,
		}),
	);
}

export function* KohakuNarukamiElderSignSaga() {
	yield takeEvery(filterAction, worker);
}
