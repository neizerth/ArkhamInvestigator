import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { isChaosBagRemoteAction } from "../../util";
import {
	type HandleUpdateChaosTokenInternalPayload,
	handleUpdateChaosTokenInternal,
} from "./handleUpdateChaosTokenInternal";

export const updateChaosTokenInternalReducer: ChaosBagReducer<
	HandleUpdateChaosTokenInternalPayload
> = (state, action) => {
	handleUpdateChaosTokenInternal({
		state,
		...action.payload,
		remote: isChaosBagRemoteAction(action),
	});
};
