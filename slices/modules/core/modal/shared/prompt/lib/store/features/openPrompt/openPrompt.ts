import { modalPrefix } from "@modules/core/modal/shared/base/config";
import type { OpenModalPayload } from "@modules/core/modal/shared/base/lib";
import type { BaseModalAction } from "@modules/core/modal/shared/base/model";
import { createAction } from "@reduxjs/toolkit";
import type { PromptModalData } from "../../../../model";

export type OpenPromptPayload<
	Action extends BaseModalAction,
	Data extends PromptModalData<Action>,
> = Omit<OpenModalPayload<Action, Data>, "type">;

export const openPrompt = createAction<
	OpenPromptPayload<BaseModalAction, PromptModalData<BaseModalAction>>
>(`${modalPrefix}/openPrompt`);
