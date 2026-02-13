import type { Action } from "@reduxjs/toolkit";
import { isTCPOutcomeAction } from "./isTCPOutcomeAction";

/** Outcome actions originated locally — excludes actions received from network to avoid re-broadcast loop. */
export const filterTCPOutcomeAction =
	<T extends Action>(match: (action: unknown) => action is T) =>
	(action: unknown): action is T => {
		if (!match(action)) {
			return false;
		}
		return isTCPOutcomeAction(action);
	};
