import {
	type GetChaosTokensCanBeAddedOptions,
	getChaosTokensCanBeAdded,
} from "./getChaosTokensCanBeAdded";

type Options = GetChaosTokensCanBeAddedOptions & {
	count: number;
};

export const canAddMultipleChaosTokens = (options: Options) => {
	const available = getChaosTokensCanBeAdded(options);
	const canBeAdded = available >= options.count;

	return {
		canBeAdded,
		available,
	};
};
