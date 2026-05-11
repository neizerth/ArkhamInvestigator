import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { isChaosBagRemoteAction } from "../../util";
import {
	type HandleAddChaosTokenInternalPayload,
	handleAddChaosTokenInternal,
} from "./handleAddChaosTokenInternal";

export const addChaosTokenInternalReducer: ChaosBagReducer<
	HandleAddChaosTokenInternalPayload
> = (state, action) => {
	handleAddChaosTokenInternal({
		state,
		...action.payload,
		remote: isChaosBagRemoteAction(action),
	});
};
