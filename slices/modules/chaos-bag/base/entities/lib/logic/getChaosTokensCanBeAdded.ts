import {
	MAX_UNLIMITED_TOKEN_COUNT,
	chaosToken,
} from "@modules/chaos-bag/base/shared/config";
import type {
	ChaosTokenCount,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";

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
