import type { BaseModalAction, ModalType } from "../../../base/model";
import type { PromptModalData } from "../../model";

export const isPromptModalData = (
	data: unknown,
	type: ModalType,
): data is PromptModalData<BaseModalAction> => {
	return type === "prompt";
};
