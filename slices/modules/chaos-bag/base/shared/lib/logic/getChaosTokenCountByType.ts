import type {
	ChaosTokenCount,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";

export type GetChaosTokenCountByTypeOptions = {
	type: ChaosTokenType;
	tokenCount: ChaosTokenCount;
};

export const getChaosTokenCountByType = ({
	type,
	tokenCount,
}: GetChaosTokenCountByTypeOptions) => {
	return tokenCount[type] || 0;
};
