import {
	chaosBagReducer,
	hapticReducer,
	i18nReducer,
	modalReducer,
	rulesReducer,
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
	...rulesReducer,
};
