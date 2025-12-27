import { signatureBaseReducer } from "./base/shared/lib";
import { signatureSelectionReducer } from "./selection/shared/lib";
import { signatureImageCacheReducer } from "./signature-image-cache/shared/lib";

export const signatureReducer = {
	...signatureBaseReducer,
	...signatureImageCacheReducer,
	...signatureSelectionReducer,
};
