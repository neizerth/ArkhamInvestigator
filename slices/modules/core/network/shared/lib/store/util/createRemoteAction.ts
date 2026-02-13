import type { Action } from "@reduxjs/toolkit";
import { hasProp } from "@shared/lib";
import { isObject } from "ramda-adjunct";

/**
 * Returns the same action with meta.remote = true so it is treated as a network
 * outcome action (e.g. for sending to other clients).
 */
export function createRemoteAction<A extends Action>(action: A) {
	const meta =
		hasProp(action, "meta") && isObject(action.meta) ? action.meta : {};

	return {
		...action,
		meta: {
			...meta,
			remote: true as const,
		},
	};
}
