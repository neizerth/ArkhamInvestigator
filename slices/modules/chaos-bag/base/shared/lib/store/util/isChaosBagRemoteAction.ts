import { type Action, isAction } from "@reduxjs/toolkit";
import { hasProp } from "@shared/lib";

/** Action deserialized from TCP (`transformTCP*DataToAction`) — chaos-bag reducers set `remote` from this. */
export type ChaosBagRemoteAction = Action<string> & {
	meta: { fromRemote: true };
};

/** Marks Redux actions deserialized from TCP (`transformTCP*DataToAction`). */
export function isChaosBagRemoteAction(
	action: unknown,
): action is ChaosBagRemoteAction {
	if (!isAction(action) || !hasProp(action, "meta")) {
		return false;
	}
	const { meta } = action;
	if (!hasProp(meta, "fromRemote")) {
		return false;
	}
	return meta.fromRemote === true;
}
