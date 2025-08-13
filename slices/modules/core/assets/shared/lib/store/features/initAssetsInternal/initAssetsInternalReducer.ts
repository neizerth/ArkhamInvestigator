import type { AssetsReducer } from "@modules/core/assets/shared/model";
import { handleInitAssetsInternal } from "./handleInitAssetsInternal";

export const initAssetsInternalReducer: AssetsReducer = (
	state,
	{ payload },
) => {
	handleInitAssetsInternal(state, payload);
};
