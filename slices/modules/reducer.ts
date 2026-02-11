import { boardReducer } from "./board/base/shared/lib";
import { chaosBagReducer } from "./chaos-bag/reducer";
import { coreModulesReducer } from "./core/reducer";
import { gameReducer } from "./game/shared/lib";
import { rulesReducer } from "./mechanics/rules/base/shared/lib";
import { roundTimingReducer } from "./mechanics/rules/round-timing/shared/lib";
import { signatureReducer } from "./signature/reducer";
import { signatureImageCacheReducer } from "./signature/signature-image-cache/shared/lib";
import { storiesReducer } from "./stories/shared/lib";

export const modulesReducer = {
	...coreModulesReducer,
	...storiesReducer,
	...boardReducer,
	...chaosBagReducer,
	...rulesReducer,
	...roundTimingReducer,
	...signatureReducer,
	...signatureImageCacheReducer,
	...gameReducer,
};
