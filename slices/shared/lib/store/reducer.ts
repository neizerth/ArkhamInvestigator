import { hapticReducer } from "@modules/haptic/shared/lib";
import { i18nReducer } from "@modules/i18n/shared/lib";
import { modalReducer, soundReducer } from "../../../features";
import { chaosBagReducer } from "../../../features/game/chaos-bag";
import { rulesReducer } from "../../../features/game/rules";
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
