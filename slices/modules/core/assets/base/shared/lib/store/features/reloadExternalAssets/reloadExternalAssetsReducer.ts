import type { AssetsReducer } from "@modules/core/assets/base/shared/model";
import { handleReloadExternalAssets } from "./handleReloadExternalAssets";

export const reloadExternalAssetsReducer: AssetsReducer = (
	state,
	{ payload },
) => {
	handleReloadExternalAssets(state, payload);
};
