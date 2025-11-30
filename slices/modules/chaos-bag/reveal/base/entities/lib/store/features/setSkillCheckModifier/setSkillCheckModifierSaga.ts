import { setCustomChaosBagSkillValue } from "@modules/chaos-bag/base/entities/lib";
import {
	selectChaosBagSkillValue,
	setSkillCheckModifierInternal,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { isNumber } from "ramda-adjunct";
import { put, select, takeEvery } from "redux-saga/effects";
import { setSkillCheckModifier } from "./setSkillCheckModifier";

function* worker({ payload }: ReturnType<typeof setSkillCheckModifier>) {
	const skillValue: ReturnType<typeof selectChaosBagSkillValue> = yield select(
		selectChaosBagSkillValue,
	);

	if (!isNumber(skillValue)) {
		return;
	}

	const value = skillValue + payload.value;

	yield put(setSkillCheckModifierInternal(payload.value));
	yield put(
		setCustomChaosBagSkillValue({
			...payload,
			value,
		}),
	);

	// const value = skillValue
}

export function* setSkillCheckModifierSaga() {
	yield takeEvery(setSkillCheckModifier.match, worker);
}
