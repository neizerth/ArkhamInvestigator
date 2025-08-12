import { selectBoardById } from "@modules/board/base/shared/lib";
import { whereReferencePartTokenEq } from "@modules/chaos-bag/effect/entities/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	elderSignModalId,
	makeAdditionalActionModalActionId,
	takeCardAndResourceModalActionId,
} from "../../../config";
import { openFatherMateoElderSignConfirm } from "./openElderSignConfirm";

function* worker({
	payload,
}: ReturnType<typeof openFatherMateoElderSignConfirm>) {
	const { boardId } = payload;
	const boardSelector = selectBoardById(boardId);
	const { investigator }: ReturnType<typeof boardSelector> =
		yield select(boardSelector);

	const subtitle = investigator.name;

	const elderSignReference = investigator.tokens_reference.find(
		whereReferencePartTokenEq("elderSign"),
	);

	const text = elderSignReference?.effect ?? "Make a choice";

	yield put(
		openConfirm({
			id: elderSignModalId,
			data: {
				title: "ability.mateo.base.elderSign.title",
				subtitle,
				text,
				faction: "mystic",
				actions: [
					createConfirmModalAction({
						id: takeCardAndResourceModalActionId,
						title: "ability.mateo.base.elderSign.cardAndResource",
						icon: "addcard",
						primary: false,
					}),
					createConfirmModalAction({
						id: makeAdditionalActionModalActionId,
						title: "ability.mateo.base.elderSign.action",
						icon: "action",
						primary: false,
					}),
				],
			},
		}),
	);
}

export function* openFatherMateoElderSignConfirmSaga() {
	yield takeEvery(openFatherMateoElderSignConfirm.match, worker);
}
