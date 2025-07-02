import { getChaosTokenLimit } from "../../getChaosTokenCountLimit";
import {
	type GetChaosTokenCountCanBeAddedOptions,
	getChaosTokenCountCanBeAdded,
} from "./getChaosTokenCountCanBeAdded";

type Options = GetChaosTokenCountCanBeAddedOptions & {
	count: number;
};

export const canAddMultipleChaosTokens = (options: Options) => {
	const { count } = options;
	const limit = getChaosTokenLimit(options);
	const available = getChaosTokenCountCanBeAdded(options);
	const canAdd = available >= count;

	return {
		canAdd,
		available,
		limit,
		count,
	};
};
