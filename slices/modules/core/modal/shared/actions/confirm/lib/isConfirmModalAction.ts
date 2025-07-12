import type { ConfirmModalAction } from "../model";

export const isConfirmModalAction = (
	modalAction: unknown,
): modalAction is ConfirmModalAction => {
	if (!modalAction || typeof modalAction !== "object") {
		return false;
	}
	if ("type" in modalAction) {
		return modalAction.type === "confirm";
	}

	return false;
};
