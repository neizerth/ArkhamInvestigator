import type {
	ChaosTokenType,
	ChaosTokenValues,
} from "@modules/chaos-bag/base/shared/model";
import type { ChaosBagEffects } from "@modules/chaos-bag/effect/shared/model";
import { fromPairs } from "ramda";
import { replaceTokenEffectValue } from "./replaceTokenEffectValue";

type Options = {
	tokenEffects: ChaosBagEffects;
	tokenValues: ChaosTokenValues;
};

type Entry = [ChaosTokenType, string];

export const replaceTokenEffectsValues = ({
	tokenEffects,
	tokenValues,
}: Options): ChaosBagEffects => {
	const entries = Object.entries(tokenEffects) as Entry[];

	const updated = entries.map((entry): Entry => {
		const [type, effect] = entry;

		const value = tokenValues[type];

		if (typeof value !== "undefined") {
			const replacedEffect = replaceTokenEffectValue({
				text: effect,
				value,
			});
			return [type, replacedEffect];
		}
		return entry;
	});

	return fromPairs(updated);
};
