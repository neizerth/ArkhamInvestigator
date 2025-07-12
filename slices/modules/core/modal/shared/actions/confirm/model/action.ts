import type { BaseModalAction } from "../../../base/model";

export type ConfirmModalAction<T = unknown> = BaseModalAction & {
	type: "confirm";
	data: T;
};
