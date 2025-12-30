import { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import { isNumber } from "ramda-adjunct";
import { put, takeEvery } from "redux-saga/effects";
import { setCustomSkillValue } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof chaosBagRevealEnd>) {
	const { skillValue } = payload;

	if (!isNumber(skillValue)) {
		return;
	}

	yield put(setCustomSkillValue(skillValue));
}

export function* syncWithSkillTestEnd() {
	yield takeEvery(chaosBagRevealEnd.match, worker);
}
