import type { BaseModalAction } from "../../../base/model";

export type CancelModalAction<T = unknown> = BaseModalAction & {
	type: "cancel";
	data?: T;
};
