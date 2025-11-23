import { chaosBagReducer as baseChaosBagReducer } from "./base/shared/lib";
import { chaosBagEffectReducer } from "./effect/shared/lib";
import { chaosOddsReducer } from "./odds/shared/lib";

export const chaosBagReducer = {
	...baseChaosBagReducer,
	...chaosBagEffectReducer,
	...chaosOddsReducer,
};
