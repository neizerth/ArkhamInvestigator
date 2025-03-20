import { i18nReducer } from "@features/i18n";
import * as reducer from "./features/reducer";

export default {
	...reducer,
	...i18nReducer,
};
