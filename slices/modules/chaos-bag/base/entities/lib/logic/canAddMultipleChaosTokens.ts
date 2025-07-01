import { getChaosTokenLimit } from "./getChaosTokenCountLimit";
import {
	type GetChaosTokensCanBeAddedOptions,
	getChaosTokensCanBeAdded,
} from "./getChaosTokensCanBeAdded";

type Options = GetChaosTokensCanBeAddedOptions & {
	count: number;
};

export const canAddMultipleChaosTokens = (options: Options) => {
	const { count } = options;
	const limit = getChaosTokenLimit(options);
	const available = getChaosTokensCanBeAdded(options);
	const canAdd = available >= count;

	return {
		canAdd,
		available,
		limit,
		count,
	};
};
