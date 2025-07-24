import { modalPrefix } from "@modules/core/modal/shared/base/config";
import type { OpenModalPayload } from "@modules/core/modal/shared/base/lib";
import type {
	BaseModalAction,
	BaseModalData,
} from "@modules/core/modal/shared/base/model";
import { createAction } from "@reduxjs/toolkit";

export type OpenCustomModalPayloadData<Action extends BaseModalAction> =
	BaseModalData<Action>;

export type OpenCustomModalPayload<Action extends BaseModalAction> = Omit<
	OpenModalPayload<OpenCustomModalPayloadData<Action>>,
	"type"
>;

export const openCustomModal = createAction<
	OpenCustomModalPayload<BaseModalAction>
>(`${modalPrefix}/openCustomModal`);
