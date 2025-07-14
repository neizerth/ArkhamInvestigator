import { setBoardPart } from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectBoardAbilityById } from "../../selectors";
import { setBoardAbilityValue } from "./setBoardAbilityValue";

function* worker({ payload }: ReturnType<typeof setBoardAbilityValue>) {
	const { boardId, abilityId } = payload;

	const abilitySelector = selectBoardAbilityById({
		boardId,
		abilityId,
	});

	const ability: ReturnType<typeof abilitySelector> =
		yield select(abilitySelector);

	if (!ability) {
		return;
	}

	const abilityValues = {
		[abilityId]: payload.value,
	};

	yield put(
		setBoardPart({
			...payload,
			data: {
				abilityValues,
			},
		}),
	);
}

export function* setBoardAbilityValueSaga() {
	yield takeEvery(setBoardAbilityValue.match, worker);
}
