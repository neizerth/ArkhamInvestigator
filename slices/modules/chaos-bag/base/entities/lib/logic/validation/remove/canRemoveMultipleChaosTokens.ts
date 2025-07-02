import {
	type GetChaosTokenCountCanBeRemovedOptions,
	getChaosTokenCountCanBeRemoved,
} from "./getChaosTokenCountCanBeRemoved";

export type CanRemoveMultipleChaosTokensOptions =
	GetChaosTokenCountCanBeRemovedOptions & {
		count: number;
	};

export const canRemoveMultipleChaosTokens = (
	options: CanRemoveMultipleChaosTokensOptions,
) => {
	const { count } = options;
	const available = getChaosTokenCountCanBeRemoved(options);

	const canRemove = available >= count;

	return {
		canRemove,
		available,
		count,
	};
};
