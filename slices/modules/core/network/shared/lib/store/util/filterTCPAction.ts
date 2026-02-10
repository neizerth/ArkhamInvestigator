import type { Action } from "@reduxjs/toolkit";
import type { TCPActionMeta } from "../../../model";
import { isTCPAction } from "./isTCPAction";

export const filterTCPAction =
	<T extends Action>(match: (action: unknown) => action is T) =>
	(action: unknown): action is T & { meta: TCPActionMeta } => {
		if (!match(action)) {
			return false;
		}
		return isTCPAction(action);
	};
