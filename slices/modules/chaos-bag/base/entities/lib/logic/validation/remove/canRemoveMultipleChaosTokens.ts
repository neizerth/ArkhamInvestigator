import {
	type GetChaosTokenCountCanBeRemovedOptions,
	getChaosTokenCountCanBeRemoved,
} from "./getChaosTokenCountCanBeRemovedFromBag";

export type CanRemoveMultipleChaosTokensOptions =
	GetChaosTokenCountCanBeRemovedOptions & {
		count: number;
	};

export const canRemoveMultipleChaosTokensFromBag = (
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
