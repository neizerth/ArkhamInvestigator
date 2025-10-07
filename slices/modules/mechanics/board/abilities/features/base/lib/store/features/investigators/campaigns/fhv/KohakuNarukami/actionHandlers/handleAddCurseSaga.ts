import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { addSingleChaosToken } from "@modules/chaos-bag/base/entities/lib";
import {
	createModalActionFilter,
	type modalActionProcessed,
} from "@modules/core/modal/shared/base/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { ActionId } from "../actions";

const filterAction = createModalActionFilter({
	ids: [ActionId.addCurse],
});

function* worker({ payload }: ReturnType<typeof modalActionProcessed>) {
	const { boardId } = payload;

	yield put(
		setBoardAbilityUse({
			boardId,
			abilityId: AbilityCode.KohakuNarukami,
			canUse: false,
			force: true,
		}),
	);

	yield put(
		addSingleChaosToken({
			boardId,
			type: "curse",
			source: "effect",
		}),
	);
}

export function* handleAddCurseSaga() {
	yield takeEvery(filterAction, worker);
}
