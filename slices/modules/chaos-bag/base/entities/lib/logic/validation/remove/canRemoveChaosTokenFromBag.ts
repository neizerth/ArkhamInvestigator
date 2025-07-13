import {
	type CanRemoveMultipleChaosTokensOptions,
	canRemoveMultipleChaosTokensFromBag,
} from "./canRemoveMultipleChaosTokens";

export type CanRemoveChaosTokenOptions = Omit<
	CanRemoveMultipleChaosTokensOptions,
	"count"
>;

export const canRemoveChaosTokenFromBag = (
	options: CanRemoveChaosTokenOptions,
) => {
	return canRemoveMultipleChaosTokensFromBag({
		...options,
		count: 1,
	});
};
