import { isAction } from "@reduxjs/toolkit";
import { hasProp } from "@shared/lib";
import { isString } from "ramda-adjunct";
import type { TCPIncomeAction } from "../../../../model";

export const isTCPIncomeAction = (
	action: unknown,
): action is TCPIncomeAction => {
	if (!isAction(action)) {
		return false;
	}
	if (
		hasProp(action, "meta") &&
		hasProp(action.meta, "source") &&
		isString(action.meta.source) &&
		action.meta.source === "tcp" &&
		hasProp(action.meta, "networkId") &&
		isString(action.meta.networkId)
	) {
		return true;
	}
	return false;
};
