import type { BaseModalAction } from "../../model";

export const isBoardModalAction = (
	action: unknown,
): action is BaseModalAction => {
	if (action && typeof action === "object") {
		return true;
	}
	return false;
};
