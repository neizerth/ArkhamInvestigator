import type { BaseModalData } from "../../base/model";

export type ConfirmModalData<Action> = BaseModalData<Action> & {
	text: string;
};
