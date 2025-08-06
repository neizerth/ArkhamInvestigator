import type { PickPartial } from "@shared/model";
import { cancelModalActionId } from "../config";
import type { CancelModalAction } from "../model";
type Options = Omit<
	PickPartial<CancelModalAction, "title">,
	"close" | "id" | "type"
>;

export const createCancelModalAction = (
	options: Options = {},
): CancelModalAction => ({
	icon: "dismiss",
	title: "Cancel",
	...options,
	id: cancelModalActionId,
	type: "cancel",
});
