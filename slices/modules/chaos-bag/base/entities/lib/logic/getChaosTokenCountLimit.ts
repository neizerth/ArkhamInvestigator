import {
	MAX_UNLIMITED_TOKEN_COUNT,
	chaosToken,
} from "@modules/chaos-bag/base/shared/config";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";

type Options = {
	type: ChaosTokenType;
	unlimitedChaosTokens: boolean;
};
export const getChaosTokenLimit = ({ type, unlimitedChaosTokens }: Options) => {
	return unlimitedChaosTokens
		? MAX_UNLIMITED_TOKEN_COUNT
		: chaosToken.count[type];
};
