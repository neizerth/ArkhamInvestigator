import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import type { PromptConfirmedPayload } from "@modules/core/modal/shared/prompt/lib";
import type { PromptModalData } from "@modules/core/modal/shared/prompt/model";

export type SkillCheckConfirmItemData = PropsWithBoardId & {
	itemId: string;
};

export type SkillCheckConfirmPayload = PromptConfirmedPayload<
	ConfirmModalAction<SkillCheckConfirmItemData>,
	PromptModalData<ConfirmModalAction<SkillCheckConfirmItemData>>
>;
