import {
	type CreateModalActionFilterAction,
	createModalActionFilter,
} from "@modules/core/modal/shared/base/lib";
import type { BaseModalData } from "@modules/core/modal/shared/base/model";
import { Linking } from "react-native";
import { takeEvery } from "redux-saga/effects";
import { followURLModalActionId } from "../config/action";
import type { FollowURLModalAction } from "../model";

type Action = CreateModalActionFilterAction<
	FollowURLModalAction,
	BaseModalData<FollowURLModalAction>
>;

const filterAction = createModalActionFilter({
	id: followURLModalActionId,
});

function worker({ payload }: Action) {
	const { modalAction } = payload;
	Linking.openURL(modalAction.url);
}

export function* followURLActionSaga() {
	yield takeEvery(filterAction, worker);
}
