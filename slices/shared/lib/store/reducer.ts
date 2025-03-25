import { i18nReducer } from "@features/i18n";
import { hapticReducer } from "@features/haptic";
import * as reducer from "./features/reducer";

export default {
	...reducer,
	...i18nReducer,
	...hapticReducer,
};
