import { MAX_UNLIMITED_TOKEN_COUNT, chaosToken } from "../../config";
import type { ChaosTokenCount, ChaosTokenType } from "../../model";

export type GetChaosTokensCanBeAddedOptions = {
	type: ChaosTokenType;
	unlimitedChaosTokens: boolean;
	tokenCount: ChaosTokenCount;
};

export const getChaosTokensCanBeAdded = ({
	type,
	unlimitedChaosTokens,
	tokenCount,
}: GetChaosTokensCanBeAddedOptions) => {
	const max = unlimitedChaosTokens
		? MAX_UNLIMITED_TOKEN_COUNT
		: chaosToken.count[type];

	const currentCount = tokenCount[type] || 0;

	const available = max - currentCount;

	return available;
};
