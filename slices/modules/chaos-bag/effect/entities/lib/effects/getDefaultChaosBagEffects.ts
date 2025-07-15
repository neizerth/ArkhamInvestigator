import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ChaosBagEffects } from "@modules/chaos-bag/effect/shared/model";
import type { ChaosBagEffectsCallbackOptions } from "../../model/effect";
import { defaultChaosBagEffectCallbacks } from "./callbacks";

export const getDefaultChaosBagEffects = (
	options: ChaosBagEffectsCallbackOptions,
) =>
	defaultChaosBagEffectCallbacks
		.map((callback) => callback(options))
		.reduce((target, effects) => {
			for (const key in effects) {
				const type = key as ChaosTokenType;
				if (!effects[type]) {
					continue;
				}
				target[type] = effects[type];
			}
			return target;
		}, {} as ChaosBagEffects);
