import { canAddMultipleChaosTokens } from "./canAddMultipleChaosTokens";
import type { GetChaosTokensCanBeAddedOptions } from "./getChaosTokensCanBeAdded";

type Options = GetChaosTokensCanBeAddedOptions;

export const canAddChaosToken = (options: Options) =>
	canAddMultipleChaosTokens({
		...options,
		count: 1,
	});
