import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { isChaosBagRemoteAction } from "../../util";
import {
	type HandleRemoveAllChaosTokensByTypePayload,
	handleRemoveAllChaosTokensByType,
} from "./handleRemoveAllChaosTokensByType";

export const removeAllChaosTokensByTypeInternalReducer: ChaosBagReducer<
	HandleRemoveAllChaosTokensByTypePayload
> = (state, action) => {
	handleRemoveAllChaosTokensByType({
		state,
		...action.payload,
		remote: isChaosBagRemoteAction(action),
	});
};
