import type { PickPartial } from "@shared/model";
import type { BaseModalAction } from "../../../base/model";
import { cancelModalActionId } from "../config";
import type { CancelModalAction } from "../model";
type Options = Omit<PickPartial<BaseModalAction, "title">, "close" | "id">;

export const createCancelModalAction = (
	options: Options = {},
): CancelModalAction => ({
	icon: "dismiss",
	title: "Cancel",
	...options,
	id: cancelModalActionId,
	type: "close",
});
