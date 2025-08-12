import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { addRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { openChaosTokenRevealModal } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { selectChaosBagTokenValues } from "@modules/chaos-bag/value/entities/lib";
import {
	createModalActionFilter,
	type modalActionProcessed,
} from "@modules/core/modal/shared/base/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { addElderSignModalActionId } from "../../config";

const filterAction = createModalActionFilter({
	ids: [addElderSignModalActionId],
});

const abilityId = AbilityCode.FatherMateo.base;

function* worker({ payload }: ReturnType<typeof modalActionProcessed>) {
	const { boardId } = payload;
	const valuesSelector = selectChaosBagTokenValues(boardId);
	const values: ReturnType<typeof valuesSelector> =
		yield select(valuesSelector);

	const value = values.elderSign;

	const token: RevealedChaosBagToken = {
		id: v4(),
		revealId: v4(),
		type: "elderSign",
		virtual: true,
		value,
	};

	yield put(
		setBoardAbilityUse({
			boardId,
			abilityId,
			canUse: false,
		}),
	);

	yield put(
		addRevealedTokens({
			tokens: [token],
		}),
	);

	yield put(openChaosTokenRevealModal());
}

export function* handleAddElderSignModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
