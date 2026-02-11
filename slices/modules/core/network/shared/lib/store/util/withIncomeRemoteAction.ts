import type { Action } from "@reduxjs/toolkit";
import { hasProp } from "@shared/lib";

export const withIncomeRemoteAction =
	<T extends Action>(match: (action: unknown) => action is T) =>
	(action: unknown): action is T & { fromRemote: boolean } => {
		if (!match(action)) {
			return false;
		}
		if (!hasProp(action, "meta")) {
			return false;
		}
		if (
			!hasProp(action.meta, "fromRemote") ||
			action.meta.fromRemote !== true
		) {
			return false;
		}
		return true;
	};
