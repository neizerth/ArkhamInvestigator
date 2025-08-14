import { boardReducer } from "@modules/board/base/shared/lib";
import { chaosBagReducer } from "@modules/chaos-bag/base/shared/lib";
import { assetsReducer } from "@modules/core/assets/shared/lib";
import { deviceReducer } from "@modules/core/device/shared/lib";
import { hapticReducer } from "@modules/core/haptic/shared/lib";
import { i18nReducer } from "@modules/core/i18n/shared/lib";
import { modalReducer } from "@modules/core/modal/shared/base/lib";
import { soundReducer } from "@modules/core/sound/shared/lib";
import { rulesReducer } from "@modules/mechanics/rules/base/shared/lib";
import { roundTimingReducer } from "@modules/mechanics/rules/round-timing/shared/lib";
import { signatureReducer } from "@modules/signature/shared/lib";
import { storiesReducer } from "@modules/stories/shared/lib";
import * as reducer from "./features/reducer";

export default {
	...reducer,
	...storiesReducer,
	...deviceReducer,
	...assetsReducer,
	...boardReducer,
	...i18nReducer,
	...hapticReducer,
	...modalReducer,
	...chaosBagReducer,
	...soundReducer,
	...rulesReducer,
	...roundTimingReducer,
	...signatureReducer,
};
