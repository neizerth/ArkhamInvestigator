import {
	createConfirmModalFilter,
	type modalConfirmed,
} from "@modules/core/modal/shared/actions/confirm/lib";
import { put, takeEvery } from "redux-saga/effects";
import { modalId } from "../../config";
import { activateDiscipline } from "../activateDiscipline";

const filterAction = createConfirmModalFilter({
	modalId,
});

function* worker({ payload }: ReturnType<typeof modalConfirmed>) {
	const { boardId } = payload;
	const { id } = payload.modalAction;

	yield put(
		activateDiscipline({
			boardId,
			abilityId: id,
		}),
	);
}

export function* LilyChenActivateConfirmedDiscipline() {
	yield takeEvery(filterAction, worker);
}
