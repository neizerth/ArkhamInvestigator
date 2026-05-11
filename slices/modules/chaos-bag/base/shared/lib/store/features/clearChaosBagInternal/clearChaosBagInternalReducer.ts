import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { isChaosBagRemoteAction } from "../../util";
import {
	type HandleClearChaosBagInternalPayload,
	handleClearChaosBagInternal,
} from "./handleClearChaosBagInternal";

export const clearChaosBagInternalReducer: ChaosBagReducer<
	HandleClearChaosBagInternalPayload
> = (state, action) => {
	handleClearChaosBagInternal({
		state,
		...action.payload,
		remote: isChaosBagRemoteAction(action),
	});
};
