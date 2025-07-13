import type { BaseModalAction, ModalType } from "../../../base/model";
import type { ConfirmModalData } from "../../model";

export const isConfirmModalData = (
	data: unknown,
	type: ModalType,
): data is ConfirmModalData<BaseModalAction> => {
	return type === "confirm";
};
