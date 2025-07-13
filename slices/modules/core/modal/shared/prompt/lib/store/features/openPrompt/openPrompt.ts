import { modalPrefix } from "@modules/core/modal/shared/base/config";
import type { OpenModalPayload } from "@modules/core/modal/shared/base/lib";
import type { BaseModalAction } from "@modules/core/modal/shared/base/model";
import { createAction } from "@reduxjs/toolkit";
import type { PromptModalData } from "../../../../model";

export type OpenPromptPayloadData<Action extends BaseModalAction> =
	PromptModalData<Action>;

export type OpenPromptPayload<Action extends BaseModalAction> = Omit<
	OpenModalPayload<OpenPromptPayloadData<Action>>,
	"type"
>;

export const openPrompt = createAction<OpenPromptPayload<BaseModalAction>>(
	`${modalPrefix}/openPrompt`,
);
