import {
	type GetChaosTokensCanBeAddedOptions,
	getChaosTokensCanBeAdded,
} from "./getChaosTokensCanBeAdded";

type Options = GetChaosTokensCanBeAddedOptions;

export const canAddChaosToken = (options: Options) =>
	getChaosTokensCanBeAdded(options) > 0;
