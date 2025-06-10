import { hapticReducer } from "@modules/core/haptic/shared/lib";
import { modalReducer } from "@modules/core/modal/shared/lib";
import { i18nReducer } from "@modules/i18n/shared/lib";
import { soundReducer } from "@modules/sound/shared/lib";
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
