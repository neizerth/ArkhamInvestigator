import {
	type chaosTokensRevealed,
	createRevealedTokenFilterAction,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { selecCanUseParallelFatherMateoFastAbility } from "../../fastUseChecker";
import { elderSignModalId } from "../fast/config";
import { triggerFastAbility } from "../fast/triggerFastAbility";

const filterAction = createRevealedTokenFilterAction({
	code: InvesigatorCode.FatherMateo.parallel,
	tokens: ["elderSign"],
});

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const { boardId } = payload;

	const canUse: ReturnType<typeof selecCanUseParallelFatherMateoFastAbility> =
		yield select(selecCanUseParallelFatherMateoFastAbility);

	if (!canUse) {
		return;
	}

	yield put(
		triggerFastAbility({
			boardId,
			modalId: elderSignModalId,
		}),
	);
}

export function* ParallelFatherMateoElderSignSaga() {
	yield takeEvery(filterAction, worker);
}
