import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { put, takeEvery } from "redux-saga/effects";
import { notEnoughSpace } from "./notEnoughSpace";

function* worker({ payload }: ReturnType<typeof notEnoughSpace>) {
	const { required } = payload;

	yield put(
		openConfirm({
			id: "not-enough-space",
			data: {
				title: "disk.notEnoughSpace.title",
				text: {
					i18nKey: "disk.notEnoughSpace.text",
					data: {
						required,
					},
				},
				actions: [],
			},
		}),
	);
}

export function* notEnoughSpaceSaga() {
	yield takeEvery(notEnoughSpace.match, worker);
}
