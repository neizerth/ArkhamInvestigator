import { getResources } from "@modules/board/base/entities/base/lib";
import {
	type ChaosBagRevealEndPayload,
	chaosBagRevealEnd,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import type { PayloadAction } from "@reduxjs/toolkit";
import { isObjectLike } from "ramda-adjunct";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = (action: unknown) => {
	if (!chaosBagRevealEnd.match(action)) {
		return false;
	}

	const { skillCheckData, failed } = action.payload;

	if (failed) {
		return false;
	}

	if (!isObjectLike(skillCheckData)) {
		return false;
	}

	if ("abilityId" in skillCheckData) {
		return skillCheckData.abilityId === AbilityCode.SkidsOToole.parallel;
	}

	return false;
};

type Payload = ChaosBagRevealEndPayload<{
	abilityId: string;
	resourcesCount: number;
}>;

type Action = PayloadAction<Payload>;

function* worker({ payload }: Action) {
	const { skillCheckBoardId } = payload;
	const { abilityId, resourcesCount } = payload.skillCheckData;

	if (abilityId !== AbilityCode.SkidsOToole.parallel) {
		return;
	}

	if (!skillCheckBoardId) {
		return;
	}

	const value = resourcesCount * 2;

	yield put(
		getResources({
			boardId: skillCheckBoardId,
			value,
		}),
	);
}

export function* ParallelSkidsOTooleEndRevealSaga() {
	yield takeEvery(filterAction, worker);
}
