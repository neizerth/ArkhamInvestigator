import type { Action } from "@reduxjs/toolkit";
import type { TCPIncomeActionMeta } from "../../../model";
import { isTCPIncomeAction } from "./isTCPIncomeAction";

export const filterTCPIncomeAction =
	<T extends Action>(match: (action: unknown) => action is T) =>
	(action: unknown): action is T & { meta: TCPIncomeActionMeta } => {
		if (!match(action)) {
			return false;
		}
		return isTCPIncomeAction(action);
	};
