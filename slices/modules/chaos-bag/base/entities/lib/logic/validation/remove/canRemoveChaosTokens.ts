import {
	type GetChaosTokenCountCanBeRemovedOptions,
	getChaosTokenCountCanBeRemoved,
} from "./getChaosTokenCountCanBeRemovedFromBag";

export type CanRemoveMultipleChaosTokensOptions =
	GetChaosTokenCountCanBeRemovedOptions & {
		count: number;
	};

export const canRemoveChaosTokens = (
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
