import {
	type CanRemoveMultipleChaosTokensOptions,
	canRemoveMultipleChaosTokens,
} from "./canRemoveMultipleChaosTokens";

export type CanRemoveChaosTokenOptions = Omit<
	CanRemoveMultipleChaosTokensOptions,
	"count"
>;

export const canRemoveChaosToken = (options: CanRemoveChaosTokenOptions) => {
	return canRemoveMultipleChaosTokens({
		...options,
		count: 1,
	});
};
