import { modalPrefix } from "@modules/core/modal/shared/base/config";
import type { OpenModalPayload } from "@modules/core/modal/shared/base/lib";
import type { BaseModalAction } from "@modules/core/modal/shared/base/model";
import { createAction } from "@reduxjs/toolkit";
import type { BoardSelectModalData } from "../../../../model";

export type OpenBoardSelectModalPayloadData<Action extends BaseModalAction> =
	BoardSelectModalData<Action>;

export type OpenBoardSelectModalPayload<Action extends BaseModalAction> = Omit<
	OpenModalPayload<OpenBoardSelectModalPayloadData<Action>>,
	"type"
>;

export const openBoardSelectModal = createAction<
	OpenBoardSelectModalPayload<BaseModalAction>
>(`${modalPrefix}/openBoardSelectModal`);
