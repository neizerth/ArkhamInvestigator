import type {
	BaseModalAction,
	ModalType,
} from "@modules/core/modal/shared/base/model";
import type { BoardSelectModalData } from "../../model";

export const isBoardSelectModalData = (
	data: unknown,
	type: ModalType,
): data is BoardSelectModalData<BaseModalAction> => {
	return type === "board-select";
};
