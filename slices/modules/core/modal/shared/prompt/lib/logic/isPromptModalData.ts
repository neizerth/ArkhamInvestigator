import type {
	BaseModalAction,
	BaseModalData,
	ModalType,
} from "../../../base/model";
import type { PromptModalData } from "../../model";

export const isPromptModalData = (
	data: BaseModalData<unknown>,
	type: ModalType,
): data is PromptModalData<BaseModalAction> => {
	return type === "prompt";
};
