import {
	createAbilitySetFilter,
	resetBoardAbilities,
	type setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilitySetFilter({
	abilityId: AbilityCode.RichardCarlisle.reaction,
	canUse: true,
});

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	const { boardId } = payload;

	yield put(
		resetBoardAbilities({
			boardId,
			type: "investigator",
			abilityTypes: ["reaction"],
		}),
	);
}

export function* RichardCarlisleResetReactionAbilitiesSaga() {
	yield takeEvery(filterAction, worker);
}
