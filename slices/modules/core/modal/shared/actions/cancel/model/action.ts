import type { BaseModalAction } from "../../../base/model";

export type CancelModalAction = BaseModalAction & {
	type: "close";
};
