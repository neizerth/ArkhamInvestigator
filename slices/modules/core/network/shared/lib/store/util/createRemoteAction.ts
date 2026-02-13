import type { Action } from "@reduxjs/toolkit";
import { hasProp } from "@shared/lib";
import { isObject } from "ramda-adjunct";
import type {
	NetworkNotificationType,
	NetworkOutcomeActionMeta,
} from "../../../model";

/**
 * Returns the same action with meta.remote = true so it is treated as a network
 * outcome action (e.g. for sending to other clients).
 */
export function createRemoteAction<A extends Action>(
	action: A,
	customMeta?: Partial<NetworkOutcomeActionMeta>,
) {
	const meta =
		hasProp(action, "meta") && isObject(action.meta) ? action.meta : {};

	const defaultNotify: NetworkNotificationType = "self";

	return {
		...action,
		meta: {
			notify: defaultNotify,
			...meta,
			...customMeta,
			remote: true as const,
		},
	};
}
