// TODO
import { createModalActionFilter } from "@modules/core/modal/shared/base/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Linking } from "react-native";
import { takeEvery } from "redux-saga/effects";
import { followURLModalActionId } from "../config/action";
import type { FollowURLModalAction } from "../model";

type Action = PayloadAction<FollowURLModalAction>;

const filterAction = createModalActionFilter({
	id: followURLModalActionId,
});

function worker({ payload }: Action) {
	Linking.openURL(payload.url);
}

export function* followURLActionSaga() {
	yield takeEvery(filterAction, worker);
}
