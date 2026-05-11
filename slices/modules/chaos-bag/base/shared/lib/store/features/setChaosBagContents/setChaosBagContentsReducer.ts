import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { isChaosBagRemoteAction } from "../../util";
import {
	type SetChaosBagContentsPayload,
	handleSetChaosBagContents,
} from "./handleSetChaosBagContents";

export const setChaosBagContentsReducer: ChaosBagReducer<
	SetChaosBagContentsPayload
> = (state, action) => {
	handleSetChaosBagContents({
		state,
		...action.payload,
		remote: isChaosBagRemoteAction(action),
	});
};
