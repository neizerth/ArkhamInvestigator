import {
	chaosBagReducer,
	hapticReducer,
	i18nReducer,
	modalReducer,
	soundReducer,
} from "../../../features";
import * as reducer from "./features/reducer";

export default {
	...reducer,
	...i18nReducer,
	...hapticReducer,
	...modalReducer,
	...chaosBagReducer,
	...soundReducer,
};
