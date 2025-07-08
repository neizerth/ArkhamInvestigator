import { boardReducer } from "@modules/board/base/shared/lib";
import { chaosBagReducer } from "@modules/chaos-bag/base/shared/lib";
import { hapticReducer } from "@modules/core/haptic/shared/lib";
import { i18nReducer } from "@modules/core/i18n/shared/lib";
import { modalReducer } from "@modules/core/modal/shared/lib";
import { soundReducer } from "@modules/core/sound/shared/lib";
import { rulesReducer } from "../../../features/game/rules";
import * as reducer from "./features/reducer";

export default {
	...reducer,
	...boardReducer,
	...i18nReducer,
	...hapticReducer,
	...modalReducer,
	...chaosBagReducer,
	...soundReducer,
	...rulesReducer,
};
