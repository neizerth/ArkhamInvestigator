import { canAddMultipleChaosTokens } from "./canAddMultipleChaosTokens";
import type { GetChaosTokenCountCanBeAddedOptions } from "./getChaosTokenCountCanBeAdded";

type Options = GetChaosTokenCountCanBeAddedOptions;

export const canAddChaosToken = (options: Options) =>
	canAddMultipleChaosTokens({
		...options,
		count: 1,
	});
