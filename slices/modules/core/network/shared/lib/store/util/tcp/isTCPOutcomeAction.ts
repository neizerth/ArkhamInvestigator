import type { NetworkOutcomeAction } from "@modules/core/network/shared/model";
import { isAction } from "@reduxjs/toolkit";
import { hasProp } from "@shared/lib";
import { isTCPIncomeAction } from "./isTCPIncomeAction";

/** Outcome actions originated locally — excludes actions received from network to avoid re-broadcast loop. */
export const isTCPOutcomeAction = (
	action: unknown,
): action is NetworkOutcomeAction => {
	if (!isAction(action)) {
		return false;
	}
	if (isTCPIncomeAction(action)) {
		return false;
	}
	if (!hasProp(action, "meta")) {
		return true;
	}
	if (!hasProp(action.meta, "remote")) {
		return true;
	}
	return false;
};
