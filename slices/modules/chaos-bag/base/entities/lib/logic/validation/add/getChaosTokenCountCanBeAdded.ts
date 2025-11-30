import {
	MAX_UNLIMITED_TOKEN_COUNT,
	chaosToken,
} from "@modules/chaos-bag/base/shared/config";
import { getChaosTokenCountByType } from "@modules/chaos-bag/base/shared/lib";
import type {
	ChaosTokenCount,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";

export type GetChaosTokenCountCanBeAddedOptions = {
	type: ChaosTokenType;
	unlimitedChaosTokens: boolean;
	tokenCount: ChaosTokenCount;
};

export const getChaosTokenCountCanBeAdded = ({
	type,
	unlimitedChaosTokens,
	tokenCount,
}: GetChaosTokenCountCanBeAddedOptions) => {
	const max = unlimitedChaosTokens
		? MAX_UNLIMITED_TOKEN_COUNT
		: (chaosToken.count[type] ?? 0);

	const currentCount = getChaosTokenCountByType({
		tokenCount,
		type,
	});

	const available = max - currentCount;

	return available;
};
