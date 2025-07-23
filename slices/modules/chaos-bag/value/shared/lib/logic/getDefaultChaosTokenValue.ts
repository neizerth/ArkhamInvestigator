import { isNumericChaosTokenType } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { defaultNumericChaosTokenValue } from "../../config";

export const getDefaultChaosTokenValue = (type: ChaosTokenType) => {
	if (isNumericChaosTokenType(type)) {
		return defaultNumericChaosTokenValue[type];
	}
	return;
};
