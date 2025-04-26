import { chaosBagReducer, hapticReducer, i18nReducer } from "../../../features";
import { modalReducer } from "../../../features/modal";
import * as reducer from "./features/reducer";

export default {
	...reducer,
	...i18nReducer,
	...hapticReducer,
	...modalReducer,
	...chaosBagReducer,
};
