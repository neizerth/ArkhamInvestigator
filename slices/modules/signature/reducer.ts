import { signatureBaseReducer } from "./base/shared/lib";
import { signatureImageCacheReducer } from "./signature-image-cache/shared/lib";
import { signatureSelectionReducer } from "./signature-selection/shared/lib";

export const signatureReducer = {
	...signatureBaseReducer,
	...signatureImageCacheReducer,
	...signatureSelectionReducer,
};
