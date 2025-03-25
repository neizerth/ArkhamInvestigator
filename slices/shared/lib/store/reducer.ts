import { hapticReducer } from "@features/haptic";
import { i18nReducer } from "@features/i18n";
import { modalReducer } from "@features/modal";
import * as reducer from "./features/reducer";

export default {
	...reducer,
	...i18nReducer,
	...hapticReducer,
	...modalReducer,
};
