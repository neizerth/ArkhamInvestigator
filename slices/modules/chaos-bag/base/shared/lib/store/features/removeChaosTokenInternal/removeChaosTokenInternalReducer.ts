import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { isChaosBagRemoteAction } from "../../util";
import {
	type HandleRemoveChaosTokenInternalPayload,
	handleRemoveChaosTokenInternal,
} from "./handleRemoveChaosTokenInternal";

export const removeChaosTokenInternalReducer: ChaosBagReducer<
	HandleRemoveChaosTokenInternalPayload
> = (state, action) => {
	handleRemoveChaosTokenInternal({
		state,
		...action.payload,
		remote: isChaosBagRemoteAction(action),
	});
};
