import { ModalActionId } from "@modules/core/modal/entities/base/config";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { put, takeEvery } from "redux-saga/effects";
import { formatBytes } from "../../shared/lib";
import { notEnoughSpace } from "./notEnoughSpace";

function* worker({ payload }: ReturnType<typeof notEnoughSpace>) {
	const format = formatBytes({
		size: payload.required,
		precision: 0,
	});
	const required = `${format.value}${format.unit}`;

	yield put(
		openConfirm({
			id: "not-enough-space",
			closeFromBackButton: false,
			data: {
				faction: "survivor",
				title: "disk.notEnoughSpace.title",
				text: {
					i18nKey: "disk.notEnoughSpace.text",
					data: {
						required,
					},
				},
				actions: [
					createConfirmModalAction({
						id: ModalActionId.restartApp,
						title: "Reload",
					}),
				],
			},
		}),
	);
}

export function* notEnoughSpaceSaga() {
	yield takeEvery(notEnoughSpace.match, worker);
}
